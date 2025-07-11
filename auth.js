// 認証機能
const VALID_CREDENTIALS = {
    'birder1': 'yaizu2024',
    'birder2': 'yaizu2024',
    'birder3': 'yaizu2024',
    'admin': 'birder2024'
};

// ログイン状態チェック
function checkAuth() {
    const isLoggedIn = localStorage.getItem('birderClubLoggedIn');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // GitHub Pagesのルートアクセス対応
    if (window.location.pathname.endsWith('/') || currentPage === '') {
        if (!isLoggedIn) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
    
    if (!isLoggedIn && currentPage !== 'login.html') {
        window.location.href = 'login.html';
        return false;
    }
    
    if (isLoggedIn && currentPage === 'login.html') {
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

// ログイン処理
function login(username, password) {
    if (VALID_CREDENTIALS[username] && VALID_CREDENTIALS[username] === password) {
        localStorage.setItem('birderClubLoggedIn', 'true');
        localStorage.setItem('birderClubUser', username);
        window.location.href = 'index.html';
        return true;
    }
    return false;
}

// ログアウト処理
function logout() {
    localStorage.removeItem('birderClubLoggedIn');
    localStorage.removeItem('birderClubUser');
    window.location.href = 'login.html';
}

// ページ読み込み時の認証チェック
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // ログインフォームの処理
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            if (login(username, password)) {
                // ログイン成功（リダイレクト処理は login 関数内で実行）
            } else {
                // ログイン失敗
                errorMessage.textContent = 'ユーザー名またはパスワードが正しくありません';
                errorMessage.style.display = 'block';
                
                // エラーメッセージを3秒後に非表示
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 3000);
            }
        });
    }
    
    // ログアウトボタンがある場合の処理
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// 現在のユーザー名を取得
function getCurrentUser() {
    return localStorage.getItem('birderClubUser') || 'ゲスト';
}