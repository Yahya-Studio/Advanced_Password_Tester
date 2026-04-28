import { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, RefreshCw, AlertTriangle, Lightbulb, Lock, Clock, BarChart3 } from 'lucide-react';
import { analyzePassword, generateStrongPassword } from './utils/passwordAnalysis';
import type { AnalysisResult } from './utils/passwordAnalysis';

function PasswordStrengthMeter({ result }: { result: AnalysisResult }) {
  const levels = [
    { key: 'weak', label: 'ضعيفة', color: 'bg-red-500' },
    { key: 'fair', label: 'مقبولة', color: 'bg-orange-500' },
    { key: 'good', label: 'جيدة', color: 'bg-yellow-500' },
    { key: 'strong', label: 'قوية', color: 'bg-lime-500' },
    { key: 'excellent', label: 'ممتازة', color: 'bg-green-500' }
  ];
  
  const levelIndex = levels.findIndex(l => l.key === result.level);
  
  return (
    <div className="space-y-4">
      <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        {levels.map((_, i) => (
          <div
            key={i}
            className={`flex-1 transition-colors duration-300 ${
              i <= levelIndex ? levels[levelIndex].color : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`text-lg font-semibold ${
          result.level === 'weak' ? 'text-red-500' :
          result.level === 'fair' ? 'text-orange-500' :
          result.level === 'good' ? 'text-yellow-500' :
          result.level === 'strong' ? 'text-lime-500' :
          'text-green-500'
        }`}>
          {levels[levelIndex].label}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {result.score}/100
        </span>
      </div>
    </div>
  );
}

function CharTypeChart({ charTypes }: { charTypes: AnalysisResult['charTypes'] }) {
  const types = [
    { key: 'lowercase', label: 'a-z', value: charTypes.lowercase, color: 'bg-blue-500' },
    { key: 'uppercase', label: 'A-Z', value: charTypes.uppercase, color: 'bg-purple-500' },
    { key: 'digits', label: '0-9', value: charTypes.digits, color: 'bg-cyan-500' },
    { key: 'symbols', label: '!@#', value: charTypes.symbols, color: 'bg-pink-500' }
  ];
  
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">تركيب الأحرف</h3>
      <div className="flex gap-2 h-8 rounded-lg overflow-hidden">
        {types.map(t => (
          <div
            key={t.key}
            className={`${t.color} transition-all duration-300 flex items-center justify-center text-white text-xs font-bold`}
            style={{ width: charTypes.total > 0 ? `${(t.value / charTypes.total) * 100}%` : '0%', minWidth: t.value > 0 ? '24px' : '0' }}
          >
            {t.value > 0 && t.value}
          </div>
        ))}
      </div>
      <div className="flex gap-4 text-xs">
        {types.map(t => (
          <span key={t.key} className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${t.color}`} />
            {t.label}: {t.value}
          </span>
        ))}
      </div>
    </div>
  );
}

function CrackTimeInfo({ result }: { result: AnalysisResult }) {
  const scenarios = [
    { speed: 10e9, label: 'حاسوب عادي (10B/s)' },
    { speed: 100e12, label: 'حاسوب خارق (100T/s)' },
    { speed: 1e15, label: 'دولة (1Q/s)' }
  ];
  
  const getTime = (rate: number): string => {
    const seconds = Math.pow(2, result.entropy) / rate / 2;
    
    if (seconds < 1) return 'لحظي';
    if (seconds < 60) return `${Math.round(seconds)} ثانية`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} دقيقة`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} ساعة`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} يوم`;
    if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} سنة`;
    if (seconds < 31536000 * 1000000) return `${Math.round(seconds / 31536000 / 1000)} ألف سنة`;
    
    const billions = seconds / 31536000 / 1000000000;
    return `${billions.toExponential(1)} مليار سنة`;
  };
  
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
        <Clock className="w-4 h-4" />
        وقت الكسر (Brute Force)
      </h3>
      <div className="space-y-2">
        {scenarios.map(s => (
          <div key={s.label} className="flex justify-between items-center text-sm p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <span className="text-gray-600 dark:text-gray-400">{s.label}</span>
            <span className="font-mono text-gray-800 dark:text-gray-200">{getTime(s.speed)}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Entropy: {result.entropy.toFixed(1)} bits | هذه التقديرات تشمل تقنيات تحسين الكسر
      </p>
    </div>
  );
}

function FeedbackList({ feedback }: { feedback: AnalysisResult['feedback'] }) {
  if (feedback.length === 0) return null;
  
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">التحليل والنصائح</h3>
      {feedback.map((item, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 p-3 rounded-lg text-sm ${
            item.type === 'warning'
              ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
              : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
          }`}
        >
          {item.type === 'warning' ? (
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          ) : (
            <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" />
          )}
          <span>{item.message}</span>
        </div>
      ))}
    </div>
  );
}

function BruteForceExplanation() {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 dark:from-purple-400/10 dark:to-pink-400/10">
      <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        كيف يعمل Brute Force Attack؟
      </h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
        يحاول تجربة جميع التركيبات الممكنة حتى يجد كلمة المرور الصحيحة.
        القوة = Pool الطول². مثال: 8 أحرف a-z = 26⁸ = 208 مليار محاولة
      </p>
    </div>
  );
}

function GeneratedPassword({ onUse }: { onUse: (pwd: string) => void }) {
  const [generated, setGenerated] = useState('');
  
  const handleGenerate = () => {
    setGenerated(generateStrongPassword(16));
  };
  
  useEffect(() => {
    handleGenerate();
  }, []);
  
  return (
    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-500/30">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-sm font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          كلمة مرور مقترحة
        </h3>
        <button
          onClick={handleGenerate}
          className="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-800/50 text-green-600 dark:text-green-400 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      <code className="block p-3 rounded-lg bg-white dark:bg-gray-800 font-mono text-sm break-all text-left">
        {generated || '...'}</code>
      <button
        onClick={() => onUse(generated)}
        className="mt-2 w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
      >
        استخدم هذه الكلمة
      </button>
    </div>
  );
}

export default function PasswordTester() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  
  useEffect(() => {
    if (password) {
      setResult(analyzePassword(password));
    } else {
      setResult(null);
    }
  }, [password]);
  
  const handleUsePassword = (pwd: string) => {
    setPassword(pwd);
    setResult(analyzePassword(pwd));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <Lock className="w-8 h-8 text-purple-500" />
            فاحص قوة كلمة المرور
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            اكتشف لماذا كلمة مرورك قد تكون ضعيفة وكيف يمكن كسرها
          </p>
        </header>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ادخل كلمة المرور هنا..."
              className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-lg font-mono tracking-wide focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
              dir="ltr"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {result && (
            <>
              <PasswordStrengthMeter result={result} />
              
              <div className="grid md:grid-cols-2 gap-6">
                <CharTypeChart charTypes={result.charTypes} />
                
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 space-y-3">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    احصائيات
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">عدد الاحرف</span>
                      <span className="font-mono">{result.charTypes.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">نوع البركة (pool)</span>
                      <span className="font-mono">
                        {[result.charTypes.lowercase > 0 && '26', result.charTypes.uppercase > 0 && '26', result.charTypes.digits > 0 && '10', result.charTypes.symbols > 0 && '32'].filter(Boolean).length > 0 
                          ? `[${[result.charTypes.lowercase > 0 && 'a-z', result.charTypes.uppercase > 0 && 'A-Z', result.charTypes.digits > 0 && '0-9', result.charTypes.symbols > 0 && '!@#'].filter(Boolean).join(', ')}]`
                          : '0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Entropy</span>
                      <span className="font-mono">{result.entropy.toFixed(1)} bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">التركيبات الممكنة</span>
                      <span className="font-mono">
                        {result.entropy > 0 ? Math.pow(2, result.entropy).toExponential(1) : '0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CrackTimeInfo result={result} />
              <FeedbackList feedback={result.feedback} />
            </>
          )}
          
          {result && result.score < 50 && (
            <GeneratedPassword onUse={handleUsePassword} />
          )}
        </div>
        
        <BruteForceExplanation />
        
        <footer className="text-center text-xs text-gray-400">
          <p>كل التحليلات تتم محلياً - لا يتم ارسال كلمة المرور لاي خادم</p>
        </footer>
      </div>
    </div>
  );
}
