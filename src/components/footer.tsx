export const Footer = () => {
  return (
    <footer className="mx-auto max-w-screen-2xl py-8 px-4 flex flex-col items-center justify-center gap-6 text-center text-white">
      <span className="flex gap-2 items-center">
        <small className="text-base font-medium">Built with:</small>
        <a
          href="https://juno.build"
          aria-label="Go to Juno website and documentation"
          className="hover:text-lavender-blue-500 active:text-lavender-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            id="Layer_2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 220.39"
            width="72"
            fill="currentColor"
          >
            <g>
              <path d="m238.29,0h220.39v110.19c0,60.82-49.38,110.19-110.19,110.19h0c-60.82,0-110.19-49.38-110.19-110.19V0h0Z"></path>
              <path d="m487.36,214.99h220.39v-104.8c0-60.86-49.34-110.19-110.19-110.19h-110.19s0,214.99,0,214.99Z"></path>
              <rect
                x="725.65"
                y="0"
                width="220.39"
                height="220.39"
                rx="110.19"
                ry="110.19"
              ></rect>
              <path d="m101.31,0c0,55.96-45.36,101.32-101.31,101.32v119.07C121.72,220.39,220.39,121.72,220.39,0h0s-119.07,0-119.07,0Z"></path>
              <circle
                className="cls-1"
                cx="931.86"
                cy="68.14"
                r="68.14"
                fill="#7888ff"
              ></circle>
            </g>
          </svg>
        </a>
      </span>

      <div className="flex gap-4">
        <a
          href="mailto:crabtr26@proton.me"
          aria-label="Send an email"
          className="hover:text-lavender-blue-500 active:text-lavender-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="32"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </a>

        <a
          href="https://www.linkedin.com/in/jacob-crabtree-7ab72610a/"
          aria-label="Visit LinkedIn profile"
          className="hover:text-lavender-blue-500 active:text-lavender-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="32"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a
          href="https://github.com/GoldToothRichards/parquet-explorer"
          aria-label="Juno is open source on GitHub"
          className="hover:text-lavender-blue-500 active:text-lavender-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="32"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49 49"
            fill="currentColor"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 47.47">
              <g>
                <g>
                  <g>
                    <path d="M24.45,0C11.02-.07.07,10.76,0,24.19c-.06,10.56,6.71,19.95,16.74,23.24,1.19.22,1.61-.53,1.61-1.19v-4.55c-6.76,1.47-8.17-2.87-8.17-2.87-.44-1.47-1.4-2.73-2.7-3.56-2.2-1.52.18-1.48.18-1.48,1.57.21,2.95,1.13,3.75,2.5,2.17,3.72,5.69,2.65,7.11,2.03.1-1.23.65-2.39,1.54-3.25-5.41-.62-11.09-2.7-11.09-12.02-.03-2.41.87-4.74,2.5-6.52-.74-2.1-.65-4.39.24-6.43,0,0,2.04-.65,6.69,2.49,3.99-1.09,8.19-1.09,12.18,0,4.64-3.14,6.67-2.49,6.67-2.49.9,2.03.99,4.33.24,6.43,1.64,1.78,2.53,4.12,2.5,6.54,0,9.33-5.69,11.39-11.1,11.99,1.17,1.19,1.78,2.83,1.66,4.51v6.7c0,.64.39,1.4,1.62,1.19,12.77-4.14,19.77-17.84,15.63-30.61C44.54,6.71,35.08-.1,24.45,0"></path>
                  </g>
                </g>
              </g>
            </svg>
          </svg>
        </a>

        <a
          href="https://x.com/crabtr26"
          aria-label="Follow Juno on X/Twitter"
          className="hover:text-lavender-blue-500 active:text-lavender-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="32"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49 49"
            fill="currentColor"
          >
            <g>
              <path d="M24.5,0C10.97,0,0,10.97,0,24.5s10.97,24.5,24.5,24.5,24.5-10.97,24.5-24.5S38.03,0,24.5,0ZM28.56,37.35l-6.35-8.87-8.29,8.87h-3.77l10.42-11.15-10.42-14.56h10.29l5.96,8.32,7.78-8.32h3.76l-9.91,10.6,10.82,15.1h-10.29Z"></path>
              <polygon points="15.46 14.38 29.96 34.62 33.55 34.62 19.05 14.38 15.46 14.38"></polygon>
            </g>
          </svg>
        </a>
      </div>
      
      <p className="text-sm text-lavender-blue-100">
        *This project is just a proof of concept. It is not intended for production use.*
      </p>
    </footer>
  );
};
