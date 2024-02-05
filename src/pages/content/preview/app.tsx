import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content view loaded');

    document.addEventListener('mouseenter', function (event) {
      // Event 타겟을 HTMLElement로 캐스팅
      var hoveredElement = event.target as HTMLElement;

      // 클래스가 엘리먼트 또는 하위 요소에 마우스가 올라가면
      if (hoveredElement.closest('.navigator_item__qXlq9')) {
        // 엘리먼트의 데이터를 가져오거나 조작할 수 있음
        var elementData = hoveredElement.textContent;

        console.log("호버된 엘리먼트 데이터:", elementData);
      }
    });


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
  }, []);
  return <div className="">content view</div>;
}
