document.addEventListener('DOMContentLoaded', () => {
    // 1. মোবাইল মেনু টগল কার্যকারিতা
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        // মেনু আইটেমে ক্লিক করলে মোবাইল মেনু বন্ধ করার জন্য
        const navLinks = document.querySelectorAll('.main-nav .nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() { // 'this' এর সঠিক রেফারেন্সের জন্য 'function' ব্যবহার করা হয়েছে
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
                // মেনু বন্ধ হওয়ার পর স্মুথ স্ক্রল করার জন্য
                const targetId = this.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 2. স্মুথ স্ক্রলিং কার্যকারিতা (শুধুমাত্র সেই লিঙ্কগুলির জন্য যা মোবাইল মেনু টগলের অংশ নয়)
    // এটি নিশ্চিত করে যে ডেস্কটপ মোডে বা অন্য কোনো অভ্যন্তরীণ লিঙ্কে ক্লিক করলে স্মুথ স্ক্রল হবে।
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // এই শর্তটি নিশ্চিত করে যে আমরা মেনু টগলের মাধ্যমে পরিচালিত লিঙ্কগুলিকে দ্বিগুণ পরিচালনা করছি না
        if (!anchor.closest('.main-nav')) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault(); // ডিফল্ট জাম্প আচরণ বন্ধ করা হয়েছে
                const targetId = this.getAttribute('href'); // লিঙ্কের href অ্যাট্রিবিউট থেকে আইডি নেওয়া হয়েছে
                if (targetId) {
                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth' // স্মুথ স্ক্রলিং চালু করা হয়েছে
                    });
                }
            });
        }
    });

    // 3. পেমেন্ট আইকনে ক্লিক করলে নম্বর দেখানোর কার্যকারিতা
    const paymentIcons = document.querySelectorAll('.payment-icon'); // ওয়েবসাইটের সকল পেমেন্ট আইকন খুঁজে বের করা হচ্ছে

    paymentIcons.forEach(icon => { // প্রতিটি পেমেন্ট আইকনের জন্য একটি কাজ করা হবে
        icon.addEventListener('click', () => { // যখন আইকনে ক্লিক করা হবে, তখন এই কাজটি হবে
            const methodName = icon.dataset.method; // আইকনের 'data-method' অ্যাট্রিবিউট থেকে পেমেন্ট পদ্ধতির নাম নেওয়া হচ্ছে
            const accountNumber = icon.dataset.number; // আইকনের 'data-number' অ্যাট্রিবিউট থেকে অ্যাকাউন্ট নম্বর নেওয়া হচ্ছে

            if (methodName && accountNumber) { // যদি নাম এবং নম্বর দুটোই থাকে
                // একটি পপ-আপ মেসেজ দেখানো হচ্ছে যেখানে পদ্ধতি এবং নম্বর উল্লেখ করা আছে
                alert(`${methodName} নম্বর:\n${accountNumber}\n\nএই নম্বরে আপনার দান পাঠাতে পারেন।`);
            } else { // যদি নাম বা নম্বর না থাকে
                alert("দুঃখিত, এই পেমেন্ট পদ্ধতির নম্বরটি বর্তমানে উপলব্ধ নয়।");
            }
        });
    });

});