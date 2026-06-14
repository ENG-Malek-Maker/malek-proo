// resume-script.js - الخاص بالسيرة الذاتية التفاعلية

// المتغير الأساسي لتتبع اللغة الحالية للملف
let currentLang = 'ar'; 

/**
 * دالة تبديل لغة السيرة الذاتية (العربية / الإنجليزية)
 */
function toggleLanguage() {
    const htmlTag = document.documentElement;
    const langBtn = document.getElementById('langBtn');
    
    // تبديل قيم المتغيرات والاتجاهات وهيكل الصفحة هندسياً
    if (currentLang === 'ar') {
        currentLang = 'en';
        htmlTag.setAttribute('lang', 'en');
        htmlTag.setAttribute('dir', 'ltr');
        langBtn.textContent = 'العربية (AR)';
    } else {
        currentLang = 'ar';
        htmlTag.setAttribute('lang', 'ar');
        htmlTag.setAttribute('dir', 'rtl');
        langBtn.textContent = 'English (EN)';
    }

    // البحث عن كل العناصر التي تمتلك سمة الترجمة وتبديل محتواها فوراً
    const elementsToTranslate = document.querySelectorAll('[data-lang-ar]');
    elementsToTranslate.forEach(el => {
        if (currentLang === 'en') {
            el.textContent = el.getAttribute('data-lang-en');
        } else {
            el.textContent = el.getAttribute('data-lang-ar');
        }
    });
}

/**
 * دالة فرز وتصفية فئات المشاريع داخل السيرة الذاتية
 * @param {string} category - الفئة المستهدفة بالفرز (all, web, games)
 */
function filterCategory(category) {
    // إلغاء تفعيل كافة أزرار الفرز العليا
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // إضافة كلاس النشاط للزر الذي تم النقر عليه
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }

    // تصفية وإظهار الكروت المتوافقة مع الفئة وإخفاء الباقي
    const cards = document.querySelectorAll('.project-card-resume');
    cards.forEach(card => {
        if (category === 'all') {
            card.classList.remove('hidden');
        } else {
            if (card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}

/**
 * دالة التقاط هيكل السيرة الذاتية وتصديرها كملف PDF احترافي وعالي الدقة
 */
function downloadPDF() {
    // تحديد الحاوية الداخلية للسيرة الذاتية المستهدفة بالطباعة فقط (بدون أزرار التحكم العلوية)
    const element = document.getElementById('resume-content');
    
    // إعدادات تصدير مستند الـ PDF لتتوافق مع معايير الطباعة القياسية A4
    const opt = {
        margin:       15,
        filename:     'Malik_Abdul_Latif_Resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            useCORS: true, 
            backgroundColor: '#090d16' // الحفاظ على الثيم المظلم الفخم أثناء التصدير
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // تشغيل المكتبة المدمجة لتوليد وتحميل الملف للمستخدم مباشرة
    html2pdf().set(opt).from(element).save();
}