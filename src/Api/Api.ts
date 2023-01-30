export const api = {
    async getBallotData() {
        const res = await fetch('/api/getBallotData');
        return await res.json();
    }
  };
  
  