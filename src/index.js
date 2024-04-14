// import { useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import StarRating from './starRating';
import './index.css';
import App from './App';

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <>
//       <StarRating
//         maxRating={10}
//         color='blue'
//         onSetRating={setMovieRating}
//       />
//       <p>This movies was rated {movieRating} stars</p>
//     </>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <App />

    {/* <StarRating
      maxRating={5}
      message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />

    <StarRating
      maxRating={4}
      message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />

    <StarRating maxRating={10} color='red' size={24} className="test" />

    <StarRating maxRating={7} />

    < StarRating />

    <StarRating defaultRating={3} />

    <Test /> */}

  </React.StrictMode>
);
