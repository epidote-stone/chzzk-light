import { useEffect, useState } from 'react';
import LiveContainer from './LiveContainer';

export default function App() {
  async function getLiveDetail(liveID) {
    const response = await fetch(`https://api.chzzk.naver.com/service/v2/channels/${liveID}/live-detail`)
    const result   = await response.json()
    const imageURL = result.content.liveImageUrl.replace('{type}', '480')
    return imageURL
  }

  function infoElementController(url) {
    // 라이브 정보 엘리멘트 조회
    const infoElement = document.querySelector('.navigator_inner__fR6Zm');
    
    if (!infoElement || infoElement.querySelector('img')) { return }

    // 이미지 엘리멘트 생성
    const infoPreviewElement = document.createElement('img');
    infoPreviewElement.setAttribute('src', url);
    infoPreviewElement.setAttribute('alt', 'Preview Image');
    infoPreviewElement.classList.add('previewImage')
    infoPreviewElement.style.width = '176px'

    // 부모 엘리멘트에 이미지 추가
    infoElement.appendChild(infoPreviewElement);
  }
  

  useEffect(() => {
    // 라이브 데이터 모음
    const container = new LiveContainer();

    container.addData({ time: new Date(), id: 'uniqueId', url: 'example.com' });

    container.addData({ time: new Date(), id: 'uniqueId', url: 'saaaaa.com' });

    console.log(container.state.data)

    console.log(container.getDataById('uniqueId'))


    // 채널 탭에 마우스 호버 시
    document.addEventListener('mouseover', async function (event) {
      // 채널 메뉴 호버 유무 확인
      const hoverElementSelector = '.navigator_item__qXlq9'
      const targetElement = event.target as HTMLElement
      
      // 엘리멘트 조회 여부
      if (!targetElement || typeof targetElement.matches !== 'function') { return }
      const closestHoverElement = targetElement.closest(hoverElementSelector)
      if (!closestHoverElement || !(closestHoverElement instanceof HTMLAnchorElement)) { return }
      if (!closestHoverElement.href.includes('/live/')) { return }

      // 호버한 방송 데이터 출력
      const hoverID  = closestHoverElement.href.replace('https://chzzk.naver.com/live/', '')
      // container.addData(hover)
      const hoverURL = await getLiveDetail(hoverID)

      infoElementController(hoverURL)

      /* 
      const liveInfo = document.querySelector('.navigator_inner__fR6Zm');
      if (liveInfo && !liveInfo.querySelector('img')) {
        if (getInquiryStatus(nowHoverLive, liveData)) {
          const response = await getStreamData(lastHoverLive)
          const image = response.content.liveImageUrl.replace('{type}', '480')

          const previewImage = document.createElement('img');
          previewImage.setAttribute('src', image);
          previewImage.setAttribute('alt', 'Image Description');
          previewImage.classList.add('previewImage')
          previewImage.style.width = '176px'

          // 이미지를 부모 엘리먼트에 추가
          liveInfo.appendChild(previewImage);
        }
      }


      // Element가 
      if (targetElement && typeof targetElement.matches === 'function') {
          const closestHoverElement = targetElement.closest(hoverElementSelector)
          if (closestHoverElement && closestHoverElement instanceof HTMLAnchorElement) {
              if ( closestHoverElement.href.includes('/live/') ) {
                const nowHoverLive = closestHoverElement.href.replace('https://chzzk.naver.com/live/', '')

                  const liveInfo = document.querySelector('.navigator_inner__fR6Zm');
                  if (liveInfo && !liveInfo.querySelector('img')) {
                    if (getInquiryStatus(nowHoverLive, liveData)) {
                      const response = await getStreamData(lastHoverLive)
                      const image = response.content.liveImageUrl.replace('{type}', '480')
    
                      const previewImage = document.createElement('img');
                      previewImage.setAttribute('src', image);
                      previewImage.setAttribute('alt', 'Image Description');
                      previewImage.classList.add('previewImage')
                      previewImage.style.width = '176px'
    
                      // 이미지를 부모 엘리먼트에 추가
                      liveInfo.appendChild(previewImage);
                    }
                  }
              }
          }

      }
      */

    });


    /*
    // MutationObserver 생성
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          let isLogin = false;
          const elements = document.querySelectorAll('.navigator_list__cHnuV');
          const loginElement = document.querySelector('.toolbar_login__xdtjd');
          const profileElement = document.querySelector('.toolbar_button__ucivH');

          if (!loginElement && profileElement) isLogin = true;
          if (loginElement && !profileElement) isLogin = false;

          // 가져온 요소 동작 수행
          if (elements.length >= (isLogin ? 2 : 1)) {
            // console.log(elements)

            const liveInfo = document.querySelector('.navigator_inner__fR6Zm');
            if (liveInfo) {
              // Check if img element is already present
              if (!liveInfo.querySelector('img')) {

                // let streamerURL = `https://api.chzzk.naver.com/service/v2/channels/${a}/live-detail`

                const previewImage = document.createElement('img');
                previewImage.setAttribute('src', 'https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/26479452/live/4271072/record/24773341/thumbnail/image_480.jpg');
                previewImage.setAttribute('alt', 'Image Description');
                previewImage.classList.add('previewImage')
                previewImage.style.width = '176px'

                // 이미지를 부모 엘리먼트에 추가
                liveInfo.appendChild(previewImage);
              }
            }
          }
        }
      });
    });

    // 대상 노드 설정 (여기서는 document.body, 전체 문서)
    const targetNode = document.body;

    // 설정한 대상 노드와 감시할 변경 사항 타입 설정
    const config = { childList: true, subtree: true };

    // MutationObserver 시작
    observer.observe(targetNode, config);

    // observer 해제 (componentWillUnmount에 해당하는 부분)
    return () => {
      observer.disconnect();
    };

    */
  }, []);
  return null; // 렌더링할 내용이 없는 경우
}
