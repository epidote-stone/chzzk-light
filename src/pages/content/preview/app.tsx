import { useEffect, useState } from 'react';
import LiveContainer from './LiveContainer';

export default function App() {
  async function infoElementController(hoverID, url) {
    // 라이브 정보 엘리멘트 조회
    const infoElementLoadClass = `a[href*="${hoverID}"] .navigator_inner__fR6Zm .navigator_text__MHoCv`;
    const elementChecker = await checkElementExistence(infoElementLoadClass, 3);

    if (!elementChecker) { return; }
    const infoElement = document.querySelector(`a[href*="${hoverID}"] .navigator_inner__fR6Zm`);
    const infoImageElement = infoElement.querySelector('img');

    if (!infoImageElement) {
      // 이미지 엘리멘트 생성
      const infoPreviewElement = document.createElement('img');
      infoPreviewElement.setAttribute('src', url);
      infoPreviewElement.setAttribute('alt', 'Preview Image');
      infoPreviewElement.classList.add('previewImage')
      infoPreviewElement.style.width = '176px'

      // 부모 엘리멘트에 이미지 추가
      infoElement.appendChild(infoPreviewElement);
      return;
    }
    if (!(infoElement instanceof HTMLAnchorElement)) { return; }
    if (infoElement.href == url) { return; }

    infoElement.href = url;
  }
  

  // 엘리멘트 조회
  async function checkElementExistence(query: string, retries: number): Promise<Element | null> {
    let count = 0;

    return new Promise<Element | null>((resolve) => {
      const intervalId = setInterval(() => {
        // 요소 선택
        const element = document.querySelector(query);

        // 요소 존재
        if (element) {
          clearInterval(intervalId); // 인터벌 중지
          resolve(element);          // 선택 요소 반환
        } else {
          count++;

          // 지정된 횟수만큼 시도한 경우
          if (count >= retries) {
            clearInterval(intervalId); // 인터벌 중지
            resolve(null);             // 요소 조회 불가 시 null
          }
        }
      }, 100); // 0.1초마다 시도
    });
  }

  async function getLiveDetail(liveID) {
    const response = await fetch(`https://api.chzzk.naver.com/service/v2/channels/${liveID}/live-detail`);
    const result = await response.json();

    // 성인 방송 썸네일
    let imageURL = 'https://ssl.pstatic.net/static/nng/glive/resource/p/static/media/image_age_restriction_search.ba30cccc6b1fd2dbf431.png';

    // 성인 방송이 아닐경우
    if (!result.content.userAdultStatus) { imageURL = result.content.liveImageUrl.replace('{type}', '480'); }

    return imageURL;
  }


  useEffect(() => {
    // 라이브 데이터 모음
    const container = new LiveContainer();

    // 채널 탭에 마우스 호버 시
    document.addEventListener('mouseover', async function (event) {
      // 채널 메뉴 호버 유무 확인
      const hoverElementSelector = '.navigator_item__qXlq9';
      const targetElement = event.target as HTMLElement;

      // 엘리멘트 조회 여부
      if (!targetElement || typeof targetElement.matches !== 'function') { return; }
      const closestHoverElement = targetElement.closest(hoverElementSelector);
      if (!closestHoverElement || !(closestHoverElement instanceof HTMLAnchorElement)) { return; }
      if (!closestHoverElement.href.includes('/live/')) { return; }

      // 호버한 방송 데이터 출력
      const hoverID = closestHoverElement.href.replace('https://chzzk.naver.com/live/', '');

      // 조회한지 2분 이상
      if (!(container.isDataValid(hoverID))) {
        // 로딩 이미지
        // 176 99.031
        // infoElementController()

        // url 업데이트
        const hoverURL = await getLiveDetail(hoverID);
        container.addData({ time: new Date(), id: hoverID, url: hoverURL });

        // 데이터 저장
        // DataStorage.saveData('liveData', container.state.data);
        container.saveDataToStorage();
      }

      const data = container.getDataById(hoverID);
      infoElementController(hoverID, data.url);
    });
  }, []);
  return null; // 렌더링할 내용이 없는 경우
}
