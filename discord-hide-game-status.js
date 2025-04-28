// ==UserScript==
// @name            Hide Discord Skins and Gaming/Music Status (Selective)
// @description     Hides the gaming/music status of Discord users unless you have DMs open with them. Always hides avatar decorations.
// @name:zh-TW      隱藏 Discord 造型與遊戲/音樂狀態（選擇性）
// @description:zh-TW 隱藏 Discord 使用者的遊戲/音樂狀態（除非你與他們有開啟私人訊息），並且總是隱藏頭像裝飾。
// @name:zh-CN      隐藏 Discord 外观和游戏/音乐状态（选择性）
// @description:zh-CN 隐藏 Discord 用户的游戏/音乐状态（除非你与他们打开了私信），并且总是隐藏头像装饰。
// @name:ja         Discordのスキンとゲーム/音楽ステータスを非表示（選択式）
// @description:ja 特定の相手とDMを開いていない限りゲーム/音楽ステータスを非表示にし、アバターデコレーションは常に非表示にします。
// @name:ko         Discord 스킨 및 게임/음악 상태 숨기기 (선택적)
// @description:ko 특정 사용자와 DM을 열어두지 않으면 게임/음악 상태를 숨기고, 아바타 장식은 항상 숨깁니다.
// @name:ar         إخفاء الأشكال وحالة اللعب/الموسيقى على Discord (اختياري)
// @description:ar يخفي حالة اللعب/الموسيقى لمستخدمي Discord ما لم تكن المحادثة الخاصة مفتوحة، ويخفي تزيين الصور الرمزية دائماً.
// @name:de         Discord-Skins und Spiel-/Musikstatus ausblenden (selektiv)
// @description:de Blendet den Spiel-/Musikstatus von Discord-Nutzern aus, außer du hast DMs mit ihnen offen. Avatar-Dekorationen werden immer ausgeblendet.
// @name:es         Ocultar Skins y Estado de Juego/Música en Discord (Selectivo)
// @description:es Oculta el estado de juego/música de los usuarios de Discord salvo que tengas el DM abierto con ellos. Las decoraciones de avatar se ocultan siempre.
// @name:fr         Masquer les Skins et le Statut de Jeu/Musique sur Discord (Sélectif)
// @description:fr Masque le statut de jeu/musique sauf si la messagerie privée est ouverte. Les décorations d'avatar sont toujours masquées.
// @name:ru         Скрыть скины и игровой/музыкальный статус в Discord (избирательно)
// @description:ru Скрывает игровой/музыкальный статус пользователей, если с ними не открыт ЛС. Украшения аватаров скрываются всегда.
// @name:pt-BR      Ocultar Skins e Status de Jogo/Música no Discord (Seletivo)
// @description:pt-BR Oculta o status de jogo/música dos usuários do Discord, a menos que você tenha um DM aberto com eles. As decorações de avatar são sempre ocultadas.
// @name:it         Nascondi Skins e Stato di Gioco/Musica su Discord (Selettivo)
// @description:it Nasconde lo stato di gioco/musica degli utenti Discord, a meno che tu non abbia una chat diretta aperta. Le decorazioni degli avatar sono sempre nascoste.
// @name:nl         Discord-skins en spel-/muziekstatus verbergen (selectief)
// @description:nl Verbergt de spel-/muziekstatus van gebruikers tenzij je een DM met hen hebt geopend. Avatar-decoraties worden altijd verborgen.
// @name:pl         Ukryj skórki i status gry/muzyki na Discordzie (selektywnie)
// @description:pl Ukrywa status gry/muzyki użytkowników, jeśli nie masz otwartego DM. Dekoracje awatarów są zawsze ukrywane.
// @name:tr         Discord Skins ve Oyun/Müzik Durumunu Gizle (Seçmeli)
// @description:tr Kişiyle DM açık değilse oyun/müzik durumunu gizler. Avatar süslemeleri her zaman gizlenir.
// @name:vi         Ẩn Skin và Trạng Thái Chơi Game/Nhạc Discord (Tùy Chọn)
// @description:vi Ẩn trạng thái chơi game/nghe nhạc trừ khi bạn đang mở DM với họ. Các trang trí avatar luôn bị ẩn.
// @name:en         Hide Discord Skins and Gaming/Music Status (Selective)
// @description:en Hides the gaming/music status of Discord users unless you have DMs open with them. Always hides avatar decorations.
// @version         1.0.1
// @author          polymegos
// @namespace       https://github.com/polymegos/discord-hide-game-status
// @supportURL      https://github.com/polymegos/discord-hide-game-status/issues
// @license         MIT
// @match           *://discord.com/*
// @run-at          document-start
// @grant           none
// @compatible      chrome
// @compatible      firefox
// @compatible      opera
// @compatible      edge
// @compatible      safari
// ==/UserScript==

(function() {
    'use strict';

    // Utility to hide all matching elements
    function hideNowPlayingColumns() {
        const elements = document.querySelectorAll("div[class*='nowPlayingColumn']");
        elements.forEach(el => {
            if (el.style.display !== 'none') {
                el.style.display = 'none';
            }
        });
    }

    // Utility to replace subtext divs containing the SVG icon with "Online"
    function replaceSubtextWithOnline() {
        const subtextDivs = document.querySelectorAll("div[class*='subtext']");
        subtextDivs.forEach(div => {
            // Look for SVG with the exact class within this div
            const svg = div.querySelector('svg.icon_c9d15c');
            if (svg) {
                div.innerHTML = '<div class="text__19b6d">Online</div>';
            }
        });
    }

    function hideAvatarDecorations() {
        const avatarDecorations = document.querySelectorAll("svg[class^='avatarDecoration']");
        avatarDecorations.forEach(svg => {
            if (svg.style.display !== 'none') {
                svg.style.display = 'none';
            }
        });

        const chatDecorations = document.querySelectorAll("img[class^='avatarDecoration']");
        chatDecorations.forEach(img => {
            if (img.style.display !== 'none') {
                img.style.display = 'none';
            }
        });
    }

    // Initial hide on page load
    hideNowPlayingColumns();
    replaceSubtextWithOnline();
    hideAvatarDecorations();

    // Observe for dynamically added elements
    const observer = new MutationObserver(() => {
        hideNowPlayingColumns();
        replaceSubtextWithOnline();
        hideAvatarDecorations();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Optional: Clean up observer on page unload
    window.addEventListener('beforeunload', () => observer.disconnect());
})();
