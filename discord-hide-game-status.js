// ==UserScript==
// @name            Hide Discord Game Status (Selective)
// @description     Hides the game-playing status of Discord users unless you have DMs open with them.
// @name:zh-TW      隱藏 Discord 遊戲狀態（選擇性）
// @description:zh-TW 除非你與某人保持開啟私人訊息，否則隱藏其遊戲狀態。
// @name:zh-CN      隐藏 Discord 游戏状态（选择性）
// @description:zh-CN 除非你打开与某人的私信，否则隐藏其游戏状态。
// @name:ja         Discordのゲームステータスを非表示（選択式）
// @description:ja 特定の相手とDMを開いていない限り、ゲームステータスを非表示にします。
// @name:ko         Discord 게임 상태 숨기기 (선택적)
// @description:ko 특정 사용자와 DM을 열어두지 않으면 게임 상태를 숨깁니다.
// @name:ar         إخفاء حالة اللعب على Discord (اختياري)
// @description:ar يخفي حالة اللعب ما لم تكن المحادثة الخاصة مع الشخص مفتوحة.
// @name:de         Discord-Spielstatus ausblenden (selektiv)
// @description:de Blendet Spielstatus aus, außer du hast DMs mit der Person geöffnet.
// @name:es         Ocultar Estado de Juego en Discord (Selectivo)
// @description:es Oculta el estado de juego salvo que tengas el DM abierto con ellos.
// @name:fr         Masquer le statut de jeu Discord (sélectif)
// @description:fr Masque le statut de jeu sauf si la messagerie privée avec la personne est ouverte.
// @name:ru         Скрыть игровой статус Discord (избирательно)
// @description:ru Скрывает статус игры пользователей, если с ними не открыт ЛС.
// @name:pt-BR      Ocultar Status de Jogo no Discord (Seletivo)
// @description:pt-BR Oculta o status de jogo, a menos que o DM com a pessoa esteja aberto.
// @name:it         Nascondi Stato di Gioco Discord (Selettivo)
// @description:it Nasconde lo stato di gioco se non hai la chat diretta aperta con quella persona.
// @name:nl         Discord-spelstatus verbergen (selectief)
// @description:nl Verbergt de spelstatus van gebruikers tenzij je een DM met hen open hebt.
// @name:pl         Ukryj status gry na Discordzie (selektywnie)
// @description:pl Ukrywa status gry, jeśli nie masz otwartego DM z daną osobą.
// @name:tr         Discord Oyun Durumunu Gizle (Seçmeli)
// @description:tr Kişiyle DM açık değilse oyun durumunu gizler.
// @name:vi         Ẩn Trạng Thái Chơi Game Discord (Tùy Chọn)
// @description:vi Ẩn trạng thái chơi game trừ khi bạn đang mở DM với người đó.
// @name:en         Hide Discord Game Status (Selective)
// @description:en Hides the game-playing status of Discord users unless you have DMs open with them.
// @version         1.0.0
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

    // Initial hide on page load
    hideNowPlayingColumns();
    replaceSubtextWithOnline();

    // Observe for dynamically added elements
    const observer = new MutationObserver(() => {
        hideNowPlayingColumns();
        replaceSubtextWithOnline();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Optional: Clean up observer on page unload
    window.addEventListener('beforeunload', () => observer.disconnect());
})();
