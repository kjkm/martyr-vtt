import "./Toolbar.css";

function Toolbar() {
  return (
    <div className="Toolbar">
      <div className="Toolbar-icon-container">
        <button className="Toolbar-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12V6.71888C21 4.52896 21 3.434 20.2927 2.83487C19.5855 2.23574 18.5045 2.41591 16.3424 2.77626L15.288 2.95199C13.6477 3.22537 12.8276 3.36205 12 3.36205C11.1724 3.36205 10.3523 3.22537 8.71202 2.95199L7.6576 2.77626C5.49553 2.41591 4.4145 2.23574 3.70725 2.83487C3 3.434 3 4.52896 3 6.71888V12C3 17.4903 7.23896 20.1547 9.89856 21.286C10.62 21.5929 10.9807 21.7464 12 21.7464C13.0193 21.7464 13.38 21.5929 14.1014 21.286C16.761 20.1547 21 17.4903 21 12Z"
              stroke="#686868"
              strokeWidth="2"
            />
            <path
              d="M6.5 9C6.79112 8.4174 7.57665 8 8.5 8C9.42335 8 10.2089 8.4174 10.5 9"
              stroke="#686868"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M13.5 9C13.7911 8.4174 14.5766 8 15.5 8C16.4234 8 17.2089 8.4174 17.5 9"
              stroke="#686868"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8.5 14C8.5 14 9.55 15 12 15C14.45 15 15.5 14 15.5 14"
              stroke="#686868"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className="Toolbar-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
              stroke="#686868"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="Toolbar-icon">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#8800ff"
              d="M256 24c-31.466 48-62.932 96-62.932 160 0 56.794 37.144 113.568 45.514 148h34.836c8.37-34.432 45.514-91.206 45.514-148 0-64-31.466-112-62.932-160zM98.637 206c-47.2 0-78.664 32-78.664 80 0 32 22.115 63.526 62.93 64-15.732-16 .002-64 31.468-64 31.89 0 56.58 21.916 69.253 46h33.828c-13.744-47.52-49.108-126-118.813-126zm314.726 0c-69.705 0-105.07 78.48-118.814 126h33.827c12.673-24.084 37.362-46 69.252-46 31.465 0 47.2 48 31.466 64 40.816-.474 62.93-32 62.93-64 0-48-31.464-80-78.663-80zM153.076 350c-38.705 0-54.44 16-54.44 48 0 16 15.734 48 47.2 48 35.4 0 61.948-27 73.01-54h-35.682c-4.657 3.57-11.5 6-21.596 6-15.733 0-31.464-32-8.492-48zm37.694 0c.017.064.03.127.048.19-13.29 2.16-12.694 23.343 1.793 23.79v.02H319.39l-.003-.02c14.486-.447 15.083-21.63 1.792-23.79.017-.063.03-.126.048-.19H190.77zm168.154 0c22.972 16 7.24 48-8.492 48-10.096 0-16.94-2.43-21.596-6h-35.682c11.062 27 37.61 54 73.01 54 31.466 0 47.2-32 47.2-48 0-32-15.735-48-54.44-48zm-118.656 42c-15.733 16-15.734 48-31.467 64l31.468-16c0 16 0 32 15.732 48 15.733-16 15.732-32 15.732-48l31.467 16c-15.734-16-15.735-48-31.468-64h-31.464z"
            />
          </svg>
        </button>
        <button className="Toolbar-icon">
          <svg
            fill="#686868"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M824.2 699.9a301.55 301.55 0 0 0-86.4-60.4C783.1 602.8 812 546.8 812 484c0-110.8-92.4-201.7-203.2-200-109.1 1.7-197 90.6-197 200 0 62.8 29 118.8 74.2 155.5a300.95 300.95 0 0 0-86.4 60.4C345 754.6 314 826.8 312 903.8a8 8 0 0 0 8 8.2h56c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5A226.62 226.62 0 0 1 612 684c60.9 0 118.2 23.7 161.3 66.8C814.5 792 838 846.3 840 904.3c.1 4.3 3.7 7.7 8 7.7h56a8 8 0 0 0 8-8.2c-2-77-33-149.2-87.8-203.9zM612 612c-34.2 0-66.4-13.3-90.5-37.5a126.86 126.86 0 0 1-37.5-91.8c.3-32.8 13.4-64.5 36.3-88 24-24.6 56.1-38.3 90.4-38.7 33.9-.3 66.8 12.9 91 36.6 24.8 24.3 38.4 56.8 38.4 91.4 0 34.2-13.3 66.3-37.5 90.5A127.3 127.3 0 0 1 612 612zM361.5 510.4c-.9-8.7-1.4-17.5-1.4-26.4 0-15.9 1.5-31.4 4.3-46.5.7-3.6-1.2-7.3-4.5-8.8-13.6-6.1-26.1-14.5-36.9-25.1a127.54 127.54 0 0 1-38.7-95.4c.9-32.1 13.8-62.6 36.3-85.6 24.7-25.3 57.9-39.1 93.2-38.7 31.9.3 62.7 12.6 86 34.4 7.9 7.4 14.7 15.6 20.4 24.4 2 3.1 5.9 4.4 9.3 3.2 17.6-6.1 36.2-10.4 55.3-12.4 5.6-.6 8.8-6.6 6.3-11.6-32.5-64.3-98.9-108.7-175.7-109.9-110.9-1.7-203.3 89.2-203.3 199.9 0 62.8 28.9 118.8 74.2 155.5-31.8 14.7-61.1 35-86.5 60.4-54.8 54.7-85.8 126.9-87.8 204a8 8 0 0 0 8 8.2h56.1c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5 29.4-29.4 65.4-49.8 104.7-59.7 3.9-1 6.5-4.7 6-8.7z"
              strokeWidth="2"
            />
          </svg>
        </button>
        <button className="Toolbar-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 11H8.01M12 11H12.01M16 11H16.01M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z"
              stroke="#686868"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
