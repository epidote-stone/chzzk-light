class LiveContainer {
  state: { data: { time: Date, id: string, url: string }[] };

  constructor() {
    this.state = {
      data: []
    };
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

  getDataById(id: string) {
    return this.state.data.find(item => item.id === id);
  }

  deleteData(id: string) {
    const index = this.state.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.state.data.splice(index, 1);
    }
  }
}


export default LiveContainer;