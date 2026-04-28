export interface AnalysisResult {
  score: number;
  level: 'weak' | 'fair' | 'good' | 'strong' | 'excellent';
  entropy: number;
  crackTime: string;
  crackTimeSeconds: number;
  feedback: FeedbackItem[];
  charTypes: CharTypeBreakdown;
  patterns: Pattern[];
}

export interface FeedbackItem {
  type: 'warning' | 'suggestion';
  message: string;
  priority: number;
}

export interface CharTypeBreakdown {
  lowercase: number;
  uppercase: number;
  digits: number;
  symbols: number;
  total: number;
}

export interface Pattern {
  name: string;
  description: string;
  matched: string;
}

export function analyzePassword(password: string): AnalysisResult {
  const feedback: FeedbackItem[] = [];
  const patterns: Pattern[] = [];
  
  const charTypes = analyzeCharTypes(password);
  const entropy = calculateEntropy(password, charTypes);
  const crackTime = calculateCrackTime(entropy);
  
  if (!password) {
    return {
      score: 0,
      level: 'weak',
      entropy: 0,
      crackTime: '0 seconds',
      crackTimeSeconds: 0,
      feedback: [],
      charTypes: { lowercase: 0, uppercase: 0, digits: 0, symbols: 0, total: 0 },
      patterns: []
    };
  }
  
  const score = calculateScore(password, charTypes, entropy);
  const level = getLevel(score);
  
  analyzePatterns(password, patterns, feedback);
  analyzeStrength(password, charTypes, feedback);
  analyzePredictability(password, feedback);
  
  feedback.sort((a, b) => a.priority - b.priority);
  
  return {
    score,
    level,
    entropy,
    crackTime,
    crackTimeSeconds: entropyToSeconds(entropy),
    feedback,
    charTypes,
    patterns
  };
}

function analyzeCharTypes(password: string): CharTypeBreakdown {
  return {
    lowercase: (password.match(/[a-z]/g) || []).length,
    uppercase: (password.match(/[A-Z]/g) || []).length,
    digits: (password.match(/[0-9]/g) || []).length,
    symbols: (password.match(/[^a-zA-Z0-9]/g) || []).length,
    total: password.length
  };
}

function calculateEntropy(password: string, charTypes: CharTypeBreakdown): number {
  let poolSize = 0;
  if (charTypes.lowercase > 0) poolSize += 26;
  if (charTypes.uppercase > 0) poolSize += 26;
  if (charTypes.digits > 0) poolSize += 10;
  if (charTypes.symbols > 0) poolSize += 32;
  
  if (poolSize === 0) return 0;
  
  return password.length * Math.log2(poolSize);
}

function calculateCrackTime(entropy: number): string {
  const seconds = entropyToSeconds(entropy);
  
  if (seconds < 1) return 'instant';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000 * 1000000) return `${Math.round(seconds / 31536000 / 1000)} thousand years`;
  if (seconds < 31536000 * 1000000000) return `${Math.round(seconds / 31536000 / 1000000)} million years`;
  
  const billions = seconds / 31536000 / 1000000000;
  return `${billions.toExponential(1)} billion years`;
}

function entropyToSeconds(entropy: number): number {
  const guessesPerSecond = 10_000_000_000;
  const combinations = Math.pow(2, entropy);
  return combinations / guessesPerSecond / 2;
}

function calculateScore(password: string, charTypes: CharTypeBreakdown, entropy: number): number {
  let score = 0;
  
  score += Math.min(charTypes.total * 4, 40);
  
  const typeBonus = [
    charTypes.lowercase > 0,
    charTypes.uppercase > 0,
    charTypes.digits > 0,
    charTypes.symbols > 0
  ].filter(Boolean).length * 5;
  score += typeBonus;
  
  score += Math.min(entropy / 2, 30);
  
  const uniqueChars = new Set(password).size;
  score += (uniqueChars / charTypes.total) * 20;
  
  if (charTypes.symbols > 0) score += 10;
  if (charTypes.total >= 12) score += 10;
  if (charTypes.total >= 16) score += 10;
  
  if (/^[a-z]+$/i.test(password)) score -= 10;
  if (/^[0-9]+$/.test(password)) score -= 30;
  if (/^(.)\1+$/.test(password)) score -= 30;
  
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getLevel(score: number): AnalysisResult['level'] {
  if (score < 20) return 'weak';
  if (score < 40) return 'fair';
  if (score < 60) return 'good';
  if (score < 80) return 'strong';
  return 'excellent';
}

function analyzePatterns(password: string, patterns: Pattern[], feedback: FeedbackItem[]) {
  const commonPatterns: [RegExp, string, string][] = [
    [/^[a-z]+\d+$/i, 'letters followed by numbers', 'الأرقام في النهاية يسهل تخمينها'],
    [/^(123|abc|qwerty|asdf|zxcv)/i, 'sequential pattern', 'التتابعات الشائعة (123, abc, qwerty)'],
    [/^(password|admin|login|welcome|master)/i, 'common word', 'هذه الكلمات من أكثر كلمات المرور المسروقة'],
    [/(.)\1{2,}/, 'repeated characters', 'تكرار الأحرف يقلل من القوة'],
    [/^[A-Z][a-z]+[0-9]+$/, 'capitalized word + numbers', 'هذا النمط شائع جداً'],
    [/^[a-z]{6,8}$/, 'lowercase only', 'كلمات المرور ذات الأحرف الصغيرة فقط سهلة الكسر']
  ];
  
  for (const [regex, name, suggestion] of commonPatterns) {
    if (regex.test(password)) {
      patterns.push({
        name,
        description: suggestion,
        matched: password.match(regex)?.[0] || ''
      });
      feedback.push({
        type: 'warning',
        message: suggestion,
        priority: 1
      });
    }
  }
}

function analyzeStrength(_password: string, charTypes: CharTypeBreakdown, feedback: FeedbackItem[]) {
  if (charTypes.total < 8) {
    feedback.push({
      type: 'warning',
      message: `كلمة المرور قصيرة جداً (${charTypes.total} أحرف). يفضل 12 حرف على الأقل`,
      priority: 2
    });
  } else if (charTypes.total < 12) {
    feedback.push({
      type: 'suggestion',
      message: 'جيد لكن يفضل استخدام 12 حرف أو أكثر للأمان الإضافي',
      priority: 4
    });
  }
  
  if (charTypes.symbols === 0) {
    feedback.push({
      type: 'suggestion',
      message: 'أضف رموز خاصة (!@#$%^&*) لزيادة التعقيد',
      priority: 3
    });
  }
  
  if (charTypes.uppercase === 0) {
    feedback.push({
      type: 'suggestion',
      message: 'أضف أحرف كبيرة (A-Z) لتنويع الأحرف',
      priority: 5
    });
  }
  
  if (charTypes.digits === 0) {
    feedback.push({
      type: 'suggestion',
      message: 'أضف أرقام (0-9) لزيادة الأمان',
      priority: 6
    });
  }
  
  if (charTypes.total >= 16 && charTypes.symbols > 0) {
    feedback.push({
      type: 'suggestion',
      message: 'ممتاز! كلمة مرور طويلة مع رموز = أمان عالي',
      priority: 10
    });
  }
}

function analyzePredictability(password: string, feedback: FeedbackItem[]) {
  const keyboardPatterns = 'qwertyuiop|asdfghjkl|zxcvbnm';
  const lower = password.toLowerCase();
  
  if (new RegExp(keyboardPatterns, 'i').test(lower)) {
    feedback.push({
      type: 'warning',
      message: 'يحتوي على نمط من لوحة المفاتيح - سهل التخمين',
      priority: 2
    });
  }
  
  if (/\d{4,}/.test(password)) {
    const yearMatch = password.match(/(19|20)\d{2}/);
    if (yearMatch) {
      feedback.push({
        type: 'warning',
        message: `يحتوي على سنة (${yearMatch[0]}) - تواريخ الميلاد قابلة للتخمين`,
        priority: 2
      });
    }
  }
  
  if (/^[a-z]+\d{2,4}$/i.test(password)) {
    feedback.push({
      type: 'warning',
      message: 'هذا النمط (كلمة + أرقام) من أكثر الأنماط المخترقة',
      priority: 2
    });
  }
}

export function generateStrongPassword(length: number = 16): string {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = lowercase + uppercase + digits + symbols;
  let password = '';
  
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  return password.split('').sort(() => Math.random() - 0.5).join('');
}
