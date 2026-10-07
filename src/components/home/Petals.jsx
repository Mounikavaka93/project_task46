const petals = [
  { id: 1, left: '4%', size: 18, delay: -2, fall: 15, flutter: 3.1, drift: 48, spin: 210, tilt: 18, color: '#c4622d' },
  { id: 2, left: '12%', size: 12, delay: -9, fall: 18, flutter: 2.6, drift: -36, spin: -160, tilt: 24, color: '#e7b09a' },
  { id: 3, left: '19%', size: 22, delay: -5, fall: 13, flutter: 3.8, drift: 28, spin: 260, tilt: 14, color: '#a84e28' },
  { id: 4, left: '27%', size: 14, delay: -14, fall: 16, flutter: 2.9, drift: -52, spin: -240, tilt: 20, color: '#d4784a' },
  { id: 5, left: '34%', size: 11, delay: -1, fall: 19, flutter: 3.4, drift: 22, spin: 140, tilt: 28, color: '#f0c7ae' },
  { id: 6, left: '42%', size: 20, delay: -11, fall: 14, flutter: 2.4, drift: -30, spin: -200, tilt: 16, color: '#c4622d' },
  { id: 7, left: '51%', size: 13, delay: -7, fall: 17, flutter: 3.6, drift: 44, spin: 300, tilt: 22, color: '#8e431c' },
  { id: 8, left: '58%', size: 17, delay: -16, fall: 12, flutter: 2.8, drift: -18, spin: -120, tilt: 12, color: '#e7b09a' },
  { id: 9, left: '66%', size: 24, delay: -4, fall: 16, flutter: 4.1, drift: 36, spin: 180, tilt: 18, color: '#b85a32' },
  { id: 10, left: '73%', size: 12, delay: -12, fall: 20, flutter: 2.5, drift: -40, spin: -280, tilt: 26, color: '#f0c7ae' },
  { id: 11, left: '80%', size: 16, delay: -6, fall: 14, flutter: 3.2, drift: 26, spin: 220, tilt: 15, color: '#c4622d' },
  { id: 12, left: '88%', size: 21, delay: -15, fall: 18, flutter: 3.7, drift: -24, spin: -190, tilt: 20, color: '#d4784a' },
  { id: 13, left: '94%', size: 13, delay: -3, fall: 15, flutter: 2.7, drift: -46, spin: 160, tilt: 30, color: '#a84e28' },
  { id: 14, left: '8%', size: 15, delay: -18, fall: 21, flutter: 3.3, drift: 18, spin: -150, tilt: 17, color: '#e8c4b4' },
  { id: 15, left: '47%', size: 10, delay: -8, fall: 13, flutter: 2.2, drift: 54, spin: 250, tilt: 32, color: '#8e431c' },
  { id: 16, left: '85%', size: 19, delay: -10, fall: 17, flutter: 3.5, drift: 14, spin: -210, tilt: 19, color: '#c97a55' },
]

export function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            width: petal.size,
            color: petal.color,
            animationDuration: `${petal.fall}s`,
            animationDelay: `${petal.delay}s`,
            '--drift': `${petal.drift}px`,
            '--spin': `${petal.spin}deg`,
          }}
        >
          <svg
            viewBox="0 0 40 56"
            className="petal-flutter h-auto w-full"
            style={{
              animationDuration: `${petal.flutter}s`,
              animationDelay: `${petal.delay * 0.3}s`,
              '--tilt': `${petal.tilt}deg`,
            }}
          >
            <path
              d="M20 2c7.5 6.5 16 17 14.5 31.5C33 46 26.5 54 20 54S7 46 5.5 33.5C4 19 12.5 8.5 20 2z"
              fill="currentColor"
            />
            <path
              d="M20 10c1.2 8 2 18 .2 36"
              fill="none"
              stroke="#fff8f2"
              strokeOpacity="0.45"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}
    </div>
  )
}
