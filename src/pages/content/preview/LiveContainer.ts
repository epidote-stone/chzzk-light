class LiveContainer {
  state: { data: { time: Date, id: string, url: string }[] };

  constructor() {
    // localStorage에서 데이터를 로드하고, 없으면 기본값 사용
    const storedData = localStorage.getItem('liveData');

    // 데이터를 로드할 때 time 속성을 Date 객체로 변환
    this.state = storedData ? JSON.parse(storedData, (key, value) => {
      if (key === 'time') { return new Date(value); }
      return value;
    }) : { data: [] };
  }

  addData(newData: { time: Date, id: string, url: string }) {
    const existingDataIndex = this.state.data.findIndex(item => item.id === newData.id);
    if (existingDataIndex !== -1) {
      // 기존 데이터가 존재하는 경우
      const existingData = this.state.data[existingDataIndex];
      const currentTime = new Date();
      const timeDifference = Math.abs(currentTime.getTime() - existingData.time.getTime());
      const twoMinutesInMilliseconds = 2 * 60 * 1000;

      if (timeDifference >= twoMinutesInMilliseconds) {
        // 2분 이상 지난 경우 데이터 업데이트
        this.state.data[existingDataIndex] = newData;
        console.log(`데이터가 업데이트되었습니다: ${newData}`);
      } else {
        // 2분 이내인 경우 무시
        console.log(`새로운 데이터를 추가하지 않습니다. 2분 이내에 이미 데이터가 추가되었습니다.`);
      }
    } else {
      // 새로운 데이터 추가
      this.state.data.push(newData);
      console.log(`새로운 데이터가 추가되었습니다: ${newData}`);
    }
  }

  isDataValid(id: string): boolean {
    // 데이터 조회
    const data = this.state.data.find(item => item.id === id);

    // 데이터가 없다면 false 반환
    if ( !data ) { return false; }

    // 현재 시간 조회
    const currentTime = new Date();

    // 새로운 데이터의 시간과 현재 시간 사이의 차이를 계산
    const timeDifference = Math.abs(currentTime.getTime() - data.time.getTime());
    // 차이가 2분 이내인지 확인
    const twoMinutesInMilliseconds = 2 * 60 * 1000; // 2분을 밀리초로 변환
    return timeDifference <= twoMinutesInMilliseconds;
  }

  getDataById(id: string) {
    return this.state.data.find(item => item.id === id);
  }

  deleteData(id: string) {
    const index = this.state.data.findIndex(item => item.id === id);
    if (index !== -1) { this.state.data.splice(index, 1); }
  }

  // storage에 데이터를 저장하는 메서드
  saveDataToStorage() {
    localStorage.setItem('liveData', JSON.stringify(this.state));
  }

  // 스토리지 데이터, 클래스 state 초기화 메서드
  clearStorage() {
    localStorage.removeItem('liveData');
    this.state = { data: [] };
  }
}

export default LiveContainer;