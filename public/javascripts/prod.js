    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');
    const messageContainer = document.getElementById("message-container");

    if (success) {
        showMessage("✅ تم إضافة المنتج بنجاح!", "success");
    }

    if (error) {
        showMessage("❌ حدث خطأ أثناء إضافة المنتج!", "error");
    }

    function showMessage(text, type) {
        const div = document.createElement("div");
        div.className = `alert ${type}`;
        div.textContent = text;
        messageContainer.appendChild(div);

        // تختفي بعد 3 ثواني
        setTimeout(() => div.remove(), 3000);

        // حذف success/error من اللينك بدون Refresh
        const url = new URL(window.location.href);
        url.searchParams.delete('success');
        url.searchParams.delete('error');
        window.history.replaceState(null, '', url);
    }
