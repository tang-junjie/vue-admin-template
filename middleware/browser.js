/**
 * 浏览器版本检测中间件，考虑要尽可能在低版本浏览器中看到提示，
 * 所以要尽量用兼容的语法写这个中间件
 */

const { detect } = require('detect-browser')
const browser = detect()

const showVersionPrompt = ({ commit }) => {
  let promptElement = document.getElementById('browser-version-prompt')

  if (!promptElement) {
    promptElement = document.createElement('div')
    promptElement.id = 'browser-version-prompt'
    // 样式选择器记得加上 #browser-version-prompt，避免产生全局污染
    promptElement.innerHTML = `
      <style>
        #browser-version-prompt {
          overflow: hidden;
          position: fixed;
          left: 0px;
          top: -48px;
          z-index: 99999;
          width: 100%;
          height: 48px;
          line-height: 48px;
          text-align: center;
          color: white;
          background: rgb(64, 158, 255);
          transition: all 0.6s ease 0s;
        }

        #browser-version-prompt .btn-download {
          margin-left: 16px;
          padding: 4px 8px;
          color: #fff;
          font-size: 12px;
          text-decoration: none !important;
          border-radius: 2px;
          background-color: #5faeff;
          transition: background-color 0.5s ease;
        }

        #browser-version-prompt .btn-download:hover {
          color: #fff;
          background-color: #69b9ff;
        }

        #browser-version-prompt .btn-close-wrap {
          position: absolute;
          top: 22px;
          right: 16px;
          cursor: pointer;
        }

        #browser-version-prompt .btn-close {
          width: 20px;
          height: 2px;
          background-color: #fff;
          transform: rotate(45deg);
          border-radius: 20px;
        }

        #browser-version-prompt .btn-close::after {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 2px;
          background-color: #fff;
          transform: rotate(90deg);
          border-radius: 20px;
          content: '';
        }
      </style>

      检测到浏览器版本过旧或者不兼容，建议使用 Chrome 浏览器以便在该网站上获得更安全、更友好的体验。

      <a
        class="btn-download"
        href="https://www.google.cn/chrome" target="__blank">
        立即下载
      </a>
      
      <div class="btn-close-wrap">
        <div class="btn-close" id="btn-close"></div>
      </div>
    `

    // 为 #btn-close 添加点击事件
    promptElement.children[2].addEventListener('click', e => {
      // 更新浏览器版本提醒状态，即在当前页面生命周期内不再提醒，刷新后会重新提醒
      commit('user/UPDATE_BROWSER_PROMPT_STATUS')
      // 隐藏
      promptElement.style.top = '-48px'
    })
    document.body.appendChild(promptElement)
  }

  // 显示提示框
  setTimeout(() => {
    promptElement.style.top = 0
  }, 500)
}

export default function({ store }) {
  // 如果在当前页面生命周期内已经提醒过了，则不再提醒
  if (store.state.user.hasPromptAboutBrowser) {
    return
  }

  if (browser) {
    if (browser.name === 'safari') {
      // 为 safari 则不提醒
      return
    } else if (browser.name !== 'chrome') {
      // 剩下的不为 chrome 则提醒
      return showVersionPrompt(store)
    } else if (+browser.version.split('.')[0] < 55) {
      // 版本低于 55 的 chrome 内核浏览器也提醒
      return showVersionPrompt(store)
    } else {
      // 剩下的都是合格的指定版本以上的 chrome 内核浏览器
      return
    }
  }

  // 检测不到浏览器版本的也要提醒
  showVersionPrompt(store)
}
