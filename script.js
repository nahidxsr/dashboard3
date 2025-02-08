// ইউজারের ব্যালেন্স Local Storage থেকে লোড করা হবে
document.addEventListener("DOMContentLoaded", function() {
    let balance = localStorage.getItem("userBalance") || 10500; // ডিফল্ট ব্যালেন্স ১০,৫০০
    
    // ব্যালেন্স আপডেট দেখানো হবে
    document.getElementById("balanceAmount").innerText = balance;
});

// ইউজারের ব্যালেন্স আপডেট করতে চাইলে এই ফাংশন ব্যবহার করুন
function updateBalance(amount) {
    localStorage.setItem("userBalance", amount);
    document.getElementById("balanceAmount").innerText = amount;
}

// উদাহরণ: যদি ইউজার ১০০ কয়েন ব্যবহার করে তাহলে ব্যালেন্স কমবে
function deductCoins(coins) {
    let currentBalance = parseInt(localStorage.getItem("userBalance") || 10500);
    if (currentBalance >= coins) {
        let newBalance = currentBalance - coins;
        updateBalance(newBalance);
    } else {
        alert("অপর্যাপ্ত ব্যালেন্স!");
    }
}
