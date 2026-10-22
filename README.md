# 🎯 فاحص قوة كلمات المرور المتقدم | Advanced Password Tester

<div align="center">

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0%2B-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4%2B-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**أداة ويب حديثة وتفاعلية لتحليل أمان وقوة كلمات المرور بالاعتماد على خوارزميات التشفير وحساب الإنتروبيا (Entropy)، مع واجهة عربية متكاملة وحماية تامة للخصوصية.**

*A modern, interactive client-side password strength analyzer built with React, TypeScript, and Tailwind CSS. Features real-time entropy calculation, brute-force crack time estimation, pattern detection, and a built-in secure password generator.*

[المميزات](#-المميزات-الرئيسية--key-features) •
[التقنيات المستخدمة](#-التقنيات-المستخدمة--tech-stack) •
[طريقة التثبيت والتشغيل](#-طريقة-التثبيت-والتشغيل--getting-started) •
[خوارزمية التحليل الأمني](#-خوارزمية-التحليل-الأمني--security-analysis-algorithm) •
[هيكلية المشروع](#-هيكلية-المشروع--project-structure) •
[الأمان والخصوصية](#-الأمان-والخصوصية--security--privacy)

</div>

---

## 🌟 المميزات الرئيسية | Key Features

- 📊 **تقييم دقيق لقوة كلمة المرور (Score 0-100):**
  * تصنيف فوري لخمسة مستويات: ضعيفة جداً، مقبولة، جيدة، قوية، وممتازة.
  * مؤشر بصري ديناميكي يتغير لونه بانسيابية بحسب مستوى الأمان.
- 🧮 **حساب الإنتروبيا الرياضية (Information Entropy):**
  * حساب عدد بتات الأمان (Bits of Entropy) وحجم مجمع الرموز (Character Pool).
  * تقدير العدد الإجمالي للاحتمالات والتركيبات الممكنة للتخمين.
- ⏳ **تقدير وقت الكسر بهجوم القوة العمياء (Brute Force Estimation):**
  * حساب الوقت المقدر لكسر كلمة المرور عبر:
    * حاسوب شخصي عادي (10 مليارات محاولة/ثانية).
    * حاسوب فائق الأداء (Supercomputer - 100 تريليون محاولة/ثانية).
    * هجمات على مستوى دول (Nation-State Level - 1 كوادريليون محاولة/ثانية).
- 🧩 **تحليل أنماط الضعف والتكرار (Pattern Detection):**
  * رصد التتابعات الرقمية والأبجدية الشائعة (`123456`، `abcdef`).
  * كشف أنماط لوحة المفاتيح المتجاورة (`qwerty`، `asdfgh`).
  * كشف تكرار الأحرف وتواريخ الميلاد والسنوات الشائعة.
- 🎲 **مولد كلمات مرور قوية (Secure Password Generator):**
  * توليد كلمات مرور معقدة وعشوائية بطول 16 خانة تجمع بين كافة أنواع الأحرف والرموز.
  * إمكانية النسخ بضغطة زر واحدة.
- 💡 **نصائح وتوصيات مخصصة (Actionable Recommendations):**
  * إرشادات ذكية توضح للمستخدم نقاط الضعف الدقيقة في كلمة المرور وكيفية تقويتها.
- 🌙 **واجهة عربية ودعم الوضع الداكن (RTL & Dark Mode):**
  * تصميم متجاوب وأنيق ومريح للعين يعمل بسلاسة على الحواسيب والهواتف.

---

## 🛠 التقنيات المستخدمة | Tech Stack

| المجال | التقنية | الوصف |
| :--- | :--- | :--- |
| **UI Library** | [React 19](https://react.dev/) | بناء واجهات المستخدم التفاعلية والمكونات البرمجية |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | توفير أمان الأنواع وكود متين وسهل الصيانة |
| **Build Tool** | [Vite](https://vitejs.dev/) | أسرع بيئة بناء وتطوير للتطبيقات الحديثة |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | تصميم واجهات حديثة ومرنة مع دعم الوضع الداكن |
| **Icons** | [Lucide React](https://lucide.dev/) | مكتبة أيقونات عصرية وخفيفة |

---

## 🚀 طريقة التثبيت والتشغيل | Getting Started

### 📋 المتطلبات المسبقة (Prerequisites)
* تثبيت **Node.js** (الإصدار `18.0` أو أحدث) مع **npm** أو **yarn** أو **pnpm**.
* تثبيت **Git**.

### 📥 خطوات التثبيت والتشغيل (Installation Steps)

1. **استنساخ المستودع (Clone):**
   ```bash
   git clone https://github.com/Yahya-Studio/Advanced_Password_Tester.git
   cd Advanced_Password_Tester
   ```

2. **الانتقال إلى مجلد التطبيق وتثبيت التبعيات:**
   ```bash
   cd password-tester
   npm install
   ```

3. **تشغيل المشروع في وضع التطوير (Development Mode):**
   ```bash
   npm run dev
   ```
   سيظهر لك رابط محلي (عادةً: `http://localhost:5173`)، افتحه في المتصفح.

4. **بناء المشروع للإنتاج (Production Build):**
   ```bash
   npm run build
   ```

5. **معاينة النسخة الإنتاجية محلياً (Preview Build):**
   ```bash
   npm run preview
   ```

---

## 🧮 خوارزمية التحليل الأمني | Security Analysis Algorithm

يعتمد التطبيق على معايير تشفير دقيقة لتقييم كلمة المرور:

1. **حساب الإنتروبيا (Shannon Entropy):**
   $$E = L \times \log_2(R)$$
   * حيث $L$ هو طول كلمة المرور.
   * و $R$ هو حجم مجمع الأحرف المستخدمة (أحرف صغيرة = 26، كبيرة = 26، أرقام = 10، رموز = 33).

2. **توزيع نقاط القوة (Total: 100):**
   * **طول كلمة المرور:** حتى 40 نقطة.
   * **تنوع أنواع الرموز والأحرف:** حتى 20 نقطة.
   * **قيمة الإنتروبيا (Entropy Value):** حتى 30 نقطة.
   * **خصومات الأنماط والتكرار:** يتم خصم نقاط عند رصد تسلسلات شائعة أو تكرار أحرف.

---

## 📁 هيكلية المشروع | Project Structure

```text
Advanced_Password_Tester/
├── password-tester/
│   ├── src/
│   │   ├── App.tsx                     # واجهة التطبيق الرئيسية والتحكم بالحالة
│   │   ├── main.tsx                    # نقطة الدخول وتهيئة React
│   │   ├── index.css                   # إعدادات Tailwind والخطوط
│   │   ├── utils/
│   │   │   └── passwordAnalysis.ts     # خوارزميات حساب القوة والإنتروبيا وزمن الكسر
│   │   └── assets/                     # الأيقونات والصور
│   ├── public/                         # الملفات الثابتة (Favicon, Icons)
│   ├── index.html                      # صفحة HTML الأساسية
│   ├── package.json                    # تبعيات التطبيق وأوامر التشغيل
│   ├── vite.config.ts                  # إعدادات أداة البناء Vite
│   ├── tailwind.config.js              # تخصيص ثيمات وألوان Tailwind
│   └── tsconfig.json                   # إعدادات مترجم TypeScript
├── .env.example                        # نموذج اختياري لمتغيرات البيئة
├── .gitignore                          # حماية المستودع من رفع node_modules والملفات المؤقتة
├── LICENSE                             # رخصة MIT مفتوحة المصدر
└── README.md                           # دليل التوثيق والتشغيل
```

---

## 🔐 الأمان والخصوصية المطلقة | Security & Privacy

> 🛡️ **ضمان خصوصية 100% (Zero Network Requests):**
> * جميع عمليات الفحص والتحليل وحساب الإنتروبيا تتم **محلياً بالكامل داخل متصفح المستخدم (Client-Side)**.
> * لا يتم إرسال كلمة المرور أو حفظها في أي خادم أو قاعدة بيانات أو أداة تحليل بيانات خارجية على الإطلاق.
> * يمكنك استخدام الأداة بدون اتصال بالإنترنت بعد تحميل الصفحة.

---

## 🤝 المساهمة | Contributing

المساهمات مرحب بها دائماً لتطوير الخوارزميات أو تحسين التصميم:
1. قم بعمل **Fork** للمستودع.
2. أنشئ فرعاً لميزتك (`git checkout -b feature/NewFeature`).
3. سجّل التعديلات (`git commit -m 'Add NewFeature'`).
4. ارفع الفرع (`git push origin feature/NewFeature`).
5. افتح **Pull Request**.

---

## 📄 الترخيص | License

هذا المشروع متاح تحت رخصة **MIT**. راجع ملف `LICENSE` للمزيد من التفاصيل.

---

<div align="center">

صُنع بـ ❤️ بواسطة **[Yahya-Studio](https://github.com/Yahya-Studio)**

</div>
