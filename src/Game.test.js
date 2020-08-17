import { get_score } from './Game';

it("score", () => {
  console.log(get_score({requirements: [0,1], score:1}, [2,3,2,2,1]));
  console.log(get_score({requirements: [0,1,-1], score:1}, [2,3,2,2,1]));
  console.log(get_score({requirements: [0,0], score:1}, [3,3,2,2,1]));
});