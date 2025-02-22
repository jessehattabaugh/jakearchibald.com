import { Fragment, FunctionalComponent, h } from 'preact';
import bgImgJpeg from 'asset-url:./scores-bg.jpg';
import bgImgAvif from 'asset-url:./scores-bg.avif';
import alphaTauriImg from 'asset-url:./alpha-tauri.svg';
import alfaRomeoImg from 'asset-url:./alfa-romeo.svg';
import redBullImg from 'asset-url:./red-bull.svg';
import williamsImg from 'asset-url:./williams.svg';

interface Props {
  results: number;
}

interface Score {
  team: string;
  img: string;
  score: number;
  score2019: number;
}

const scores: Score[] = [
  {
    team: 'Alpha Tauri',
    img: alphaTauriImg,
    score: 22.1,
    score2019: 12.8,
  },
  {
    team: 'Alfa Romeo',
    img: alfaRomeoImg,
    score: 23.4,
    score2019: 20.1,
  },
  {
    team: 'Red Bull',
    img: redBullImg,
    score: 8.6,
    score2019: 15.8,
  },
  {
    team: 'Williams',
    img: williamsImg,
    score: 11.1,
    score2019: 14.1,
  },
];

const css = `
@font-face {
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 600;
  src: url(https://fonts.gstatic.com/s/titilliumweb/v9/NaPDcZTIAOhVxoMyOr9n_E7ffBzCGItzY5abuWI.woff2) format('woff2');
}
h2 + .f1-figure {
  margin-top: 0;
}
.f1-scoreboard-container {
  display: grid;
  min-height: 18em;
  align-items: center;
  position: relative;
  padding: 0 0.5em;
}
.f1-scoreboard-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.f1-scoreboard-bg img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
.f1-scoreboard {
  position: relative;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Titillium Web', sans-serif;
  color: #fff;
  border-collapse: collapse;
  line-height: 1;
  text-align: right;
  counter-reset: pos;
  width: 100%;
  max-width: 420px;
  margin: 1em auto;
  --cell-padding: 0.5em;
}
.f1-scoreboard th {
  background: #000;
  text-align: left;
}
.f1-scoreboard thead th {
  text-align: right;
}
.f1-scoreboard td {
  background: rgba(0, 0, 0, 0.6);
}
.f1-scoreboard td,
.f1-scoreboard th {
  padding: var(--cell-padding);
}
.f1-scoreboard .corner-border {
  border-radius: 0 0.3em 0 0;
}
.f1-scoreboard > tbody > tr:last-child > td:last-child {
  border-radius: 0 0 0.3em 0;
}
.f1-scoreboard > tbody tr {
  counter-increment: pos;
}
.f1-scoreboard > tbody tr > th:nth-child(1) {
  padding: 1px 2px 2px 3px;
}
.f1-scoreboard > tbody tr > th:nth-child(1)::before {
  content: counter(pos);
  text-align: center;
  color: #000;
  background: white;
  display: flex;
  --size: 1.8em;
  height: var(--size);
  width: var(--size);
  align-items: center;
  justify-content: center;
  border-radius: 0 0 0.3em 0;
}
.f1-scoreboard .num-col {
  width: 23%;
}
.f1-scoreboard .team-col {
  width: 37%;
}
.f1-scoreboard .slower {
  background: #ffc800;
  color: #000;
}
.f1-scoreboard .faster {
  background: #45b720;
}
.f1-scoreboard .no-padding {
  padding: 0;
}
.f1-scoreboard .team {
  display: grid;
  grid-template-columns: 1fr max-content;
  height: 100%;
  align-items: center;
}
.f1-scoreboard .team .name {
  padding: var(--cell-padding);
}
.f1-scoreboard .team .logo {
  width: 32px;
  height: 32px;
}
`;

const Scores: FunctionalComponent<Props> = ({ results }) => {
  const boardResults = scores.slice(0, results);
  boardResults.sort((a, b) => a.score - b.score);

  return (
    <Fragment>
      <figure class="full-figure max-figure f1-figure">
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <div class="f1-scoreboard-container">
          <picture class="f1-scoreboard-bg">
            <source srcset={bgImgAvif} type="image/avif"></source>
            <img alt="" src={bgImgJpeg} />
          </picture>
          <table class="f1-scoreboard">
            <thead>
              <tr>
                <th class="pos-col"></th>
                <th class="team-col"></th>
                <th class="num-col">Score</th>
                <th class="corner-border num-col">vs 2019</th>
                <th style="visibility: hidden" class="num-col"></th>
              </tr>
            </thead>
            {boardResults.map((result, i) => (
              <tr>
                <th></th>
                <th class="no-padding">
                  <div class="team">
                    <div class="name">{result.team}</div>
                    <img
                      width="1"
                      height="1"
                      class="logo"
                      src={result.img}
                      alt=""
                    />
                  </div>
                </th>
                <td>{result.score.toFixed(1)}</td>
                <td
                  class={result.score > result.score2019 ? 'slower' : 'faster'}
                >
                  {result.score > result.score2019 && '+'}
                  {(result.score - result.score2019).toFixed(1)}
                </td>
                {i === 0 ? (
                  <td class="corner-border">Leader</td>
                ) : (
                  <td>+{(result.score - boardResults[0].score).toFixed(1)}</td>
                )}
              </tr>
            ))}
          </table>
        </div>
      </figure>
    </Fragment>
  );
};

export default Scores;
