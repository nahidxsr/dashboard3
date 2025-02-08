// 🏦 লোকাল স্টোরেজ থেকে ব্যালেন্স লোড করুন
let userBalance = localStorage.getItem("balance") || 10500;
document.querySelector(".balance-section p").innerHTML = `💰 ${userBalance} ≈ <b>৳${userBalance / 100}</b>`;

// 🚀 ব্যালেন্স আপডেট ফাংশন
function updateBalance(amount) {
    userBalance += amount;
    localStorage.setItem("balance", userBalance);
    document.querySelector(".balance-section p").innerHTML = `💰 ${userBalance} ≈ <b>৳${userBalance / 100}</b>`;
}

// 🎯 ডেমো টেস্টের জন্য ব্যালেন্স যোগ করার একটি বোতাম (পরীক্ষার জন্য)
// Uncomment করলে ব্যালেন্স আপডেট হবে
// updateBalance(500);
