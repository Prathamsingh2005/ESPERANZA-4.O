"use client";

import { useEffect, useRef, useState } from "react";

function Countdown() {
  const target = new Date("2026-09-25T18:00:00+05:30").getTime();

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const distance = Math.max(target - Date.now(), 0);

      setTime({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    update();

    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  const boxes = [
    ["DAYS", time.days],
    ["HOURS", time.hours],
    ["MINUTES", time.minutes],
    ["SECONDS", time.seconds],
  ];

  return (
    <div className="countdown-grid">
      {boxes.map(([label, value]) => (
        <div className="countdown-box" key={label}>
          <div className="countdown-number">
            {String(value).padStart(2, "0")}
          </div>

          <div className="countdown-label">{label}</div>
        </div>
      ))}
    </div>
  );
}

function Particles() {
  return (
    <div className="particles">
      {Array.from({ length: 55 }).map((_, index) => (
        <span
          key={index}
          className="particle"
          style={{
            left: `${(index * 17.7) % 100}%`,
            top: `${(index * 31.3) % 100}%`,
            animationDelay: `${(index % 12) * 0.45}s`,
            animationDuration: `${5 + (index % 6)}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reelRef = useRef<HTMLVideoElement | null>(null);

  const [intro, setIntro] = useState(true);
  const [posterOpen, setPosterOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [reelPlaying, setReelPlaying] = useState(false);

  const startExperience = async () => {
    setIntro(false);

    if (audioRef.current) {
      audioRef.current.volume = 0.55;

      try {
        await audioRef.current.play();
        setMusicOn(true);
      } catch {
        setMusicOn(false);
      }
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      try {
        await audioRef.current.play();
        setMusicOn(true);
      } catch {
        setMusicOn(false);
      }
    }
  };

  const handleReelPlay = () => {
    setReelPlaying(true);

    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleReelPause = () => {
    setReelPlaying(false);

    if (musicOn && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleReelEnded = () => {
    setReelPlaying(false);

    if (musicOn && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <main className="site">

      {/* =====================================================
          MAIN MUSIC
      ===================================================== */}

      <audio
        ref={audioRef}
        src="/song.m4a"
        loop
        preload="auto"
      />

      {/* =====================================================
          PARTICLES
      ===================================================== */}

      <Particles />

      {/* =====================================================
          CINEMATIC INTRO
      ===================================================== */}

      <section
        className={`intro ${intro ? "intro-visible" : "intro-hidden"}`}
      >
        <div className="intro-light intro-light-one" />
        <div className="intro-light intro-light-two" />
        <div className="intro-light intro-light-three" />

        <div className="curtain curtain-left" />
        <div className="curtain curtain-right" />

        <div className="intro-content">

          <div className="intro-logo">
            <img
              src="/logosrms.jpeg"
              alt="SRMS"
            />
          </div>

          <p className="intro-small">
            SHRI RAM MURTI SMARAK
          </p>

          <h1 className="intro-college">
            INTERNATIONAL BUSINESS SCHOOL
          </h1>

          <div className="intro-divider">
            <span />
            <b>✦</b>
            <span />
          </div>

          <h1 className="intro-title">
            ESPERANZA
          </h1>

          <h1 className="intro-subtitle">
            FRESHERS 2K26
          </h1>

         <button
  onClick={startExperience}
  className="enter-button"
>
  <span>Join The Celebration</span>
</button>

          <h1 className="intro-hint">
            TAP TO BEGIN YOUR JOURNEY
          </h1>

        </div>
      </section>

      {/* =====================================================
          MUSIC CONTROL
      ===================================================== */}

      <button
        className={`music-control ${
          musicOn ? "music-active" : ""
        }`}
        onClick={toggleMusic}
      >
        <span className="music-icon">
          {musicOn ? "♫" : "×"}
        </span>

        <span>
          {musicOn ? "MUSIC ON" : "MUSIC OFF"}
        </span>
      </button>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="header">

        <div className="header-inner">

          <div className="brand">

            <div className="brand-logo">
              <img
                src="/logosrms.jpeg"
                alt="SRMS"
              />
            </div>

            <div>
              <p className="brand-title">
                SRMS IBS
              </p>

              <h1 className="brand-subtitle">
                FRESHERS 2K26
              </h1>
            </div>

          </div>

          <div className="event-pill">
            ESPERANZA 4.0
          </div>

        </div>

      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">

        <div className="hero-orb hero-orb-red" />
        <div className="hero-orb hero-orb-purple" />
        <div className="hero-orb hero-orb-blue" />

        <div className="beam beam-left" />
        <div className="beam beam-right" />
        <div className="beam beam-center" />

        <div className="hero-content">

          {/* COLLEGE */}

          <div className="college-branding">

            <div className="hero-logo">
              <img
                src="/logosrms.jpeg"
                alt="Shri Ram Murti Smarak"
              />
            </div>

            <h2>
              SHRI RAM MURTI SMARAK
            </h2>

            <h3>
              INTERNATIONAL BUSINESS SCHOOL
            </h3>

            <div className="presented">
              <span />
              <h3>PRESENTS</h3>
              <span />
            </div>

          </div>

          {/* EVENT */}

          <div className="event-heading">

            <p className="freshers-label">
              FRESHERS PARTY
            </p>

            <h1>
              ESPERANZA
            </h1>

            <div className="four-point-zero">

              <span />
              <b>4.0</b>
              <span />

            </div>

            <h2 className="bollywood">
              DAY LIGHT DHAMAKA!
            </h2>

            <p className="eras">
              90s&nbsp;&nbsp;•&nbsp;&nbsp;2000s&nbsp;&nbsp;•&nbsp;&nbsp;2010s&nbsp;&nbsp;•&nbsp;&nbsp;CURRENT
            </p>

          </div>

          {/* POSTER */}

          <div className="poster-section">

            <button
              className={`poster-button ${
                posterOpen ? "poster-open" : ""
              }`}
              onClick={() => setPosterOpen(true)}
              aria-label="Open invitation poster"
            >

              <div className="poster-glow" />

              <div className="poster-card">

                <img
                  src="/poster.png"
                  alt="Esperanza 4.0 Freshers Party"
                />

                {!posterOpen && (
                  <div className="poster-overlay">

                    <div className="tap-circle">
                      <span>✦</span>
                    </div>

                    <p>
                      TAP TO OPEN
                    </p>

                    <small>
                      YOUR INVITATION AWAITS
                    </small>

                  </div>
                )}

                <div className="poster-shine" />

                <span className="poster-corner top-left" />
                <span className="poster-corner top-right" />
                <span className="poster-corner bottom-left" />
                <span className="poster-corner bottom-right" />

              </div>

            </button>

          </div>

          <div className="scroll-hint">
            <span>SCROLL TO DISCOVER</span>
            <b>↓</b>
          </div>

        </div>

      </section>

      {/* =====================================================
          YOU ARE INVITED
      ===================================================== */}

      <section className="invitation">

        <div className="invitation-orb invitation-orb-one" />
        <div className="invitation-orb invitation-orb-two" />

        <div className="section-container">

          <p className="eyebrow">
            A DAY FULL OF MEMORIES 
          </p>

          <div className="gold-divider">
            <span />
            <b>✦</b>
            <span />
          </div>

          <h2 className="invitation-heading">
            You Are
            <br />
            <span>Invited.</span>
          </h2>

          <p className="invitation-description">
            To a vibrant day of music, laughter, dance and
            Unforgettable.
          </p>

          <div className="invitation-card">

            <div className="card-logo">

              <img
                src="/logosrms.jpeg"
                alt="SRMS"
              />

            </div>

            <p className="card-college">
              SHRI RAM MURTI SMARAK
            </p>

            <p className="card-college-small">
              INTERNATIONAL BUSINESS SCHOOL
            </p>

            <div className="card-line" />

            <p className="cordially">
              CORDIALLY INVITES YOU TO
            </p>

            <h3>
              Esperanza <span>4.0</span>
            </h3>

            <p className="card-party">
              FRESHERS PARTY • 2K26
            </p>

            <div className="details-grid">

              <div className="detail">
                <span>DATE</span>
                <strong>25 SEP</strong>
                <small>2026</small>
              </div>

              <div className="detail">
                <span>VENUE</span>
                <strong>AUDITORIUM</strong>
                <small>SRMS IBS</small>
              </div>

              <div className="detail">
                <span>THEME</span>
                <strong>BOLLYWOOD</strong>
                <small>90s → NOW</small>
              </div>

            </div>

            <p className="quote">
              “Where hope meets the horizon.”
            </p>

          </div>

          <p className="organized">
            ORGANIZED BY MANAGEMENT CLUB
          </p>

        </div>

      </section>

      {/* =====================================================
          COUNTDOWN
      ===================================================== */}

      <section className="countdown-section">

        <div className="section-container countdown-container">

          <p className="eyebrow">
            THE COUNTDOWN BEGINS
          </p>

          <h2>
            The Day Is
            <span> Almost Here.</span>
          </h2>

          <Countdown />

        </div>

      </section>

      {/* =====================================================
          FILM STRIP
      ===================================================== */}

      <section className="film-strip">

        <div className="film-track">

          {[
            "LIGHTS",
            "CAMERA",
            "MUSIC",
            "DANCE",
            "BOLLYWOOD",
            "MEMORIES",
            "ESPERANZA",
            "LIGHTS",
            "CAMERA",
            "MUSIC",
            "DANCE",
            "BOLLYWOOD",
            "MEMORIES",
            "ESPERANZA",
          ].map((item, index) => (
            <div
              className="film-item"
              key={index}
            >
              <span>{item}</span>
              <b>✦</b>
            </div>
          ))}

        </div>

      </section>

      {/* =====================================================
          REEL
      ===================================================== */}

      <section className="reel-section">

        <div className="section-container">

          <div className="reel-heading">

            <p className="eyebrow">
              YOUR FIRST GLIMPSE
            </p>

            <h2>
              The Day
              <br />
              <span>Is Calling.</span>
            </h2>

            <p>
              Turn up the volume and experience
              the Esperanza 4.0 teaser.
            </p>

          </div>

          <div className="reel-frame">

            <div className="reel-top">

              <span>
                ESPERANZA 4.0
              </span>

              <span>
                FRESHERS 2K26
              </span>

            </div>

            <div className="video-wrapper">

              <video
                ref={reelRef}
                src="/reel.mp4"
                controls
                playsInline
                preload="metadata"
                onPlay={handleReelPlay}
                onPause={handleReelPause}
                onEnded={handleReelEnded}
              />

              {!reelPlaying && (
                <div className="video-hint">
                  <div>
                    ▶
                  </div>
                </div>
              )}

            </div>

            <div className="reel-bottom">

              <span>LIGHTS</span>
              <span>CAMERA</span>
              <span>ACTION</span>

            </div>

          </div>

          <p className="audio-note">
            ORIGINAL TEASER AUDIO • MAIN MUSIC PAUSES AUTOMATICALLY
          </p>

        </div>

      </section>

      {/* =====================================================
          BOLLYWOOD THROUGH YEARS
      ===================================================== */}

      <section className="eras-section">

        <div className="section-container">

          <div className="eras-heading">

            <p className="eyebrow">
              A JOURNEY THROUGH TIME
            </p>

            <h2>
              Bollywood
              <br />
              <span>Through The Years</span>
            </h2>

          </div>

          <div className="eras-grid">

            <div className="era-card">

              <span className="era-number">
                01
              </span>

              <h3>
                90s
              </h3>

              <h4>
                THE NOSTALGIA
              </h4>

              <p>
                The unforgettable era of melodies,
                romance and timeless Bollywood memories.
              </p>

              <div className="era-line" />

            </div>

            <div className="era-card">

              <span className="era-number">
                02
              </span>

              <h3>
                2000s
              </h3>

              <h4>
                THE GOLDEN ERA
              </h4>

              <p>
                Iconic songs, unforgettable characters
                and the sound of a generation.
              </p>

              <div className="era-line" />

            </div>

            <div className="era-card">

              <span className="era-number">
                03
              </span>

              <h3>
                2010s
              </h3>

              <h4>
                THE BLOCKBUSTERS
              </h4>

              <p>
                Bigger stories, bigger music and
                unforgettable cinematic moments.
              </p>

              <div className="era-line" />

            </div>

            <div className="era-card">

              <span className="era-number">
                04
              </span>

              <h3>
                2026
              </h3>

              <h4>
                THE NEW WAVE
              </h4>

              <p>
                Your generation. Your music.
                Your story begins today.
              </p>

              <div className="era-line" />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section className="experience">

        <div className="experience-glow" />

        <div className="section-container experience-content">

          <p className="eyebrow">
            LIGHTS • MUSIC • MEMORIES
          </p>

          <h2>
            This Isn't Just
            <br />
            <span>Another Party.</span>
          </h2>

          <p className="experience-description">
            It is the beginning of your college story.
            Dress up, show up, dance your heart out
            and create memories that stay long after
            the lights go down.
          </p>

          <div className="experience-grid">

            <div className="experience-card">
              <span>01</span>
              <h3>MUSIC</h3>
              <p>Feel every beat.</p>
            </div>

            <div className="experience-card">
              <span>02</span>
              <h3>DANCE</h3>
              <p>Own the moment.</p>
            </div>

            <div className="experience-card">
              <span>03</span>
              <h3>MEMORIES</h3>
              <p>Make them last.</p>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL
      ===================================================== */}

      <section className="final-section">

        <div className="final-glow" />

        <div className="final-content">

          <div className="final-logo">

            <img
              src="/logosrms.jpeg"
              alt="SRMS"
            />

          </div>

          <p className="eyebrow">
            THE STORY BEGINS HERE
          </p>

          <h2>
            Be There.
          </h2>

          <div className="final-divider">
            <span />
            <b>✦</b>
            <span />
          </div>

          <p className="final-text">
            Where hope meets the horizon.
            <br />
            Where strangers become memories.
            <br />
            Where your college story begins.
          </p>

          <div className="final-date">
            25 • 09 • 2026
          </div>

          <p className="final-organized">
            ORGANIZED BY MANAGEMENT CLUB
          </p>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">

        <p>
          SHRI RAM MURTI SMARAK INTERNATIONAL BUSINESS SCHOOL
        </p>

        <span>
          ESPERANZA 4.0 • FRESHERS 2K26
        </span>

      </footer>

      {/* =====================================================
          ALL CSS
      ===================================================== */}

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #030205;
          color: white;
          font-family: Arial, Helvetica, sans-serif;
        }

        button {
          font-family: inherit;
        }

        .site {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 50% 10%,
              rgba(110,20,100,.08),
              transparent 35%
            ),
            #030205;
        }


        /* =====================================================
           PARTICLES
        ===================================================== */

        .particles {
          position: fixed;
          inset: 0;
          z-index: 30;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: white;
          box-shadow:
            0 0 8px rgba(255,40,130,.9),
            0 0 15px rgba(130,60,255,.8);
          animation: particleFloat linear infinite;
          opacity: 0;
        }

        @keyframes particleFloat {

          0% {
            transform:
              translateY(60px)
              scale(.2);
            opacity: 0;
          }

          20% {
            opacity: .8;
          }

          70% {
            opacity: .35;
          }

          100% {
            transform:
              translateY(-150px)
              scale(1.1);
            opacity: 0;
          }

        }


        /* =====================================================
           INTRO
        ===================================================== */

        .intro {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #020103;
          transition:
            opacity 1.4s ease,
            visibility 1.4s ease;
        }

        .intro-visible {
          opacity: 1;
          visibility: visible;
        }

        .intro-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .intro-content {
          position: relative;
          z-index: 40;
          width: min(90%, 700px);
          text-align: center;
        }

        .intro-logo {
          width: 100px;
          height: 100px;
          margin: auto;
          padding: 7px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.35);
          background: rgba(0,0,0,.5);
          box-shadow:
            0 0 70px rgba(255,0,100,.25);
          animation: introLogo 4s ease-in-out infinite;
        }

        .intro-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        @keyframes introLogo {

          0%,100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.06);
          }

        }

        .intro-small {
          margin-top: 20px;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: .20em;
          color: #ff9bc4;
        }

        .intro-college {
          margin-top: 10px;
          font-size: 15px;
          letter-spacing: .10em;
          color: rgba(255,255,255,.45);
        }

        .intro-divider,
        .gold-divider,
        .final-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 24px;
        }

        .intro-divider span,
        .gold-divider span,
        .final-divider span {
          display: block;
          width: 50px;
          height: 1px;
          background:
            linear-gradient(
              90deg,
              transparent,
              #ff2c82
            );
        }

        .intro-divider span:last-child,
        .gold-divider span:last-child,
        .final-divider span:last-child {
          background:
            linear-gradient(
              90deg,
              #8c46ff,
              transparent
            );
        }

        .intro-divider b,
        .gold-divider b,
        .final-divider b {
          color: #ffd86a;
          font-size: 13px;
        }

        .intro-title {
          margin-top: 20px;
          font-family: Georgia, serif;
          font-size: clamp(52px, 12vw, 100px);
          line-height: .9;
          letter-spacing: .08em;

          background:
            linear-gradient(
              110deg,
              #fff0a2,
              #ff4797,
              #9d62ff,
              #fff0a2
            );

          background-size: 300% auto;

          -webkit-background-clip: text;
          background-clip: text;

          color: transparent;

          animation:
            titleGradient 6s linear infinite;
        }

        @keyframes titleGradient {

          to {
            background-position: 300% center;
          }

        }

        .intro-subtitle {
          margin-top: 15px;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: .5em;
          color: rgba(255,255,255,.55);
        }

        .enter-button {
  position: relative;
  margin-top: 45px;
  padding: 22px 48px;
  min-width: 300px;
  min-height: 70px;

  border-radius: 999px;
  border: 1px solid rgba(255,70,140,.65);

  background:
    linear-gradient(
      100deg,
      rgba(255,0,100,.18),
      rgba(110,40,255,.18)
    );

  color: white;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: .18em;

  cursor: pointer;
  overflow: hidden;
  transition: all .4s ease;
}

        .enter-button::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              110deg,
              yellow,
              rgba(255,255,255,.3),
              transparent
            );
          transform: translateX(-120%);
          animation: buttonShine 3.5s infinite;
        }

        @keyframes buttonShine {

          0%,55% {
            transform: translateX(-120%);
          }

          75%,100% {
            transform: translateX(120%);
          }

        }

        .enter-button:hover {
          transform: scale(1.07);
          background:
            linear-gradient(
              100deg,
              #d90058,
              #6f2cff
            );
          box-shadow:
            0 0 40px rgba(255,0,100,.35);
        }

        .intro-hint {
          margin-top: 17px;
          font-size: 7px;
          letter-spacing: .3em;
          color: rgba(255,255,255,.25);
        }

        .intro-light {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: .45;
        }

        .intro-light-one {
          left: 0;
          top: 5%;
          background: #ff0055;
        }

        .intro-light-two {
          right: 0;
          top: 15%;
          background: #7028ff;
        }

        .intro-light-three {
          left: 40%;
          bottom: -100px;
          background: #ffb000;
        }

        .curtain {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 25;
          width: 51%;
          background:
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,.035) 0,
              transparent 15px,
              rgba(0,0,0,.25) 30px
            ),
            linear-gradient(
              90deg,
              #030003,
              #79001e,
              #150006
            );
          box-shadow: 0 0 80px rgba(0,0,0,.9);
          transition:
            transform 1.6s
            cubic-bezier(.77,0,.175,1);
        }

        .curtain-left {
          left: 0;
        }

        .curtain-right {
          right: 0;
          transform: scaleX(-1);
        }

        .intro-hidden .curtain-left {
          transform: translateX(-105%);
        }

        .intro-hidden .curtain-right {
          transform:
            translateX(105%)
            scaleX(-1);
        }


        /* =====================================================
           MUSIC
        ===================================================== */

        .music-control {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 14px 8px 8px;
          border: 1px solid rgba(255,0,120,.3);
          border-radius: 999px;
          background: rgba(4,2,8,.75);
          backdrop-filter: blur(20px);
          color: rgba(255,255,255,.7);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .15em;
          cursor: pointer;
          transition: all .4s ease;
        }

        .music-control:hover {
          transform: translateY(-4px);
          border-color: rgba(255,0,120,.7);
          box-shadow:
            0 0 35px rgba(255,0,120,.2);
        }

        .music-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 29px;
          height: 29px;
          border-radius: 50%;
          background:
            linear-gradient(
              135deg,
              #ff176f,
              #743cff
            );
          color: white;
          font-size: 14px;
        }

        .music-active .music-icon {
          animation: musicPulse 1.4s ease-in-out infinite;
        }

        @keyframes musicPulse {

          0%,100% {
            box-shadow:
              0 0 0 rgba(255,0,100,0);
          }

          50% {
            box-shadow:
              0 0 25px rgba(255,0,100,.55);
          }

        }


        /* =====================================================
           HEADER
        ===================================================== */

        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 80;
        }

        .header-inner {
          width: min(94%, 1250px);
          margin: auto;
          padding-top: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 12px 7px 7px;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 999px;
          background: rgba(0,0,0,.5);
          backdrop-filter: blur(20px);
        }

        .brand-logo {
          width: 36px;
          height: 36px;
          padding: 2px;
          border-radius: 50%;
          background: rgba(255,255,255,.1);
        }

        .brand-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .brand-title {
          margin: 0;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .15em;
        }

        .brand-subtitle {
          margin: 4px 0 0;
          font-size: 6px;
          letter-spacing: .22em;
          color: #777;
        }

        .event-pill {
          padding: 9px 14px;
          border: 1px solid rgba(255,0,120,.25);
          border-radius: 999px;
          background: rgba(0,0,0,.5);
          backdrop-filter: blur(20px);
          color: #ff8dbb;
          font-size: 7px;
          font-weight: 800;
          letter-spacing: .2em;
        }


        /* =====================================================
           HERO
        ===================================================== */

        .hero {
          position: relative;
          min-height: 100vh;
          padding:
            130px
            20px
            80px;
          overflow: hidden;
        }

        .hero-content {
          position: relative;
          z-index: 40;
          width: min(100%, 1200px);
          margin: auto;
          text-align: center;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
        }

        .hero-orb-red {
          width: 500px;
          height: 500px;
          left: -250px;
          top: 20%;
          background: rgba(255,0,70,.15);
          animation: orbMove 9s ease-in-out infinite;
        }

        .hero-orb-purple {
          width: 550px;
          height: 550px;
          right: -280px;
          top: 25%;
          background: rgba(110,30,255,.15);
          animation:
            orbMove 11s ease-in-out
            infinite reverse;
        }

        .hero-orb-blue {
          width: 350px;
          height: 350px;
          left: 42%;
          bottom: -250px;
          background: rgba(0,100,255,.1);
        }

        @keyframes orbMove {

          0%,100% {
            transform: translate(0,0);
          }

          50% {
            transform:
              translate(45px,-35px);
          }

        }

        .beam {
          position: absolute;
          top: -20%;
          width: 170px;
          height: 140%;
          opacity: .09;
          filter: blur(18px);
          background:
            linear-gradient(
              180deg,
              white,
              transparent 70%
            );
          pointer-events: none;
        }

        .beam-left {
          left: 8%;
          transform: rotate(27deg);
          animation: beamLeft 7s ease-in-out infinite alternate;
        }

        .beam-right {
          right: 8%;
          transform: rotate(-27deg);
          animation: beamRight 8s ease-in-out infinite alternate;
        }

        .beam-center {
          left: 46%;
          animation: beamCenter 5s ease-in-out infinite alternate;
        }

        @keyframes beamLeft {

          to {
            transform: rotate(43deg);
          }

        }

        @keyframes beamRight {

          to {
            transform: rotate(-43deg);
          }

        }

        @keyframes beamCenter {

          to {
            transform: rotate(10deg);
          }

        }


        /* =====================================================
           COLLEGE BRANDING
        ===================================================== */

        .college-branding {
          animation: heroAppear 1.2s ease both;
        }

        @keyframes heroAppear {

          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        .hero-logo {
          width: 78px;
          height: 78px;
          margin: auto;
          padding: 5px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.3);
          background: rgba(0,0,0,.5);
          box-shadow:
            0 0 60px rgba(255,0,100,.18);
        }

        .hero-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .college-branding h2 {
          margin:
            22px
            0
            0;
          font-size: clamp(22px, 4vw, 50px);
          font-weight: 900;
          letter-spacing: .06em;
        }

        .college-branding h3 {
          margin: 8px 0 0;
          font-size: clamp(12px, 2vw, 23px);
          font-weight: 800;
          letter-spacing: .18em;
          color: rgba(255,255,255,.8);
        }

        .presented {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
        }

        .presented span {
          width: 55px;
          height: 1px;
          background:
            linear-gradient(
              90deg,
              transparent,
              #ff2c82
            );
        }

        .presented span:last-child {
          background:
            linear-gradient(
              90deg,
              #8a40ff,
              transparent
            );
        }

        .presented p {
          margin: 0;
          font-size: 7px;
          letter-spacing: .4em;
          color: #ffabc9;
        }


        /* =====================================================
           EVENT HEADING
        ===================================================== */

        .event-heading {
          margin-top: 30px;
        }

        .freshers-label {
          margin: 0;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .5em;
          color: #ffd66c;
        }

        .event-heading h1 {
          margin:
            12px
            0
            0;
          font-family: Georgia, serif;
          font-size: clamp(58px, 13vw, 150px);
          line-height: .85;
          letter-spacing: .06em;

          background:
            linear-gradient(
              110deg,
              #fff2a4,
              #ff4b99,
              #985cff,
              #fff2a4
            );

          background-size: 300% auto;

          -webkit-background-clip: text;
          background-clip: text;

          color: transparent;

          animation:
            titleGradient
            7s linear infinite;

          text-shadow:
            0 0 60px rgba(255,0,100,.12);
        }

        .four-point-zero {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-top: 5px;
        }

        .four-point-zero span {
          width: 70px;
          height: 1px;
          background:
            linear-gradient(
              90deg,
              transparent,
              #ff3f91
            );
        }

        .four-point-zero span:last-child {
          background:
            linear-gradient(
              90deg,
              #8b48ff,
              transparent
            );
        }

        .four-point-zero b {
          font-family: Georgia, serif;
          font-size: 30px;
          font-weight: 400;
          color: #ffd869;
        }

        .bollywood {
          margin:
            17px
            0
            0;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: .4em;
        }

        .eras {
          margin:
            8px
            0
            0;
          font-size: 7px;
          letter-spacing: .3em;
          color: #777;
        }


        /* =====================================================
           POSTER
        ===================================================== */

        .poster-section {
          width: min(100%, 1000px);
          margin:
            45px
            auto
            0;
          perspective: 1400px;
        }

        .poster-button {
          position: relative;
          display: block;
          width: 100%;
          padding: 0;
          border: 0;
          background: none;
          cursor: pointer;
        }

        .poster-glow {
          position: absolute;
          inset: -20px;
          z-index: -1;
          border-radius: 40px;
          background:
            linear-gradient(
              120deg,
              rgba(255,0,80,.3),
              rgba(255,190,0,.2),
              rgba(120,30,255,.3),
              rgba(0,130,255,.2)
            );
          background-size: 300% 300%;
          filter: blur(30px);
          animation: rainbowGlow 7s ease infinite;
        }

        @keyframes rainbowGlow {

          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }

        }

        .poster-card {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,.3);
          background: black;
          box-shadow:
            0 50px 120px rgba(0,0,0,.85),
            0 0 90px rgba(255,0,100,.12);
          transform:
            rotateX(2deg);
          transition:
            transform 1s ease,
            box-shadow 1s ease;
        }

        .poster-button:hover .poster-card {
          transform:
            rotateX(0deg)
            translateY(-8px)
            scale(1.008);
          box-shadow:
            0 60px 130px rgba(0,0,0,.9),
            0 0 100px rgba(255,0,100,.2);
        }

        .poster-card > img {
          display: block;
          width: 100%;
          height: auto;
          filter:
            brightness(.6)
            saturate(.9);
          transition:
            filter 1.5s ease,
            transform 2s ease;
        }

        .poster-open .poster-card > img {
          filter:
            brightness(1)
            saturate(1.12);
          transform: scale(1.035);
        }

        .poster-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background:
            radial-gradient(
              circle,
              rgba(255,0,100,.08),
              rgba(0,0,0,.55)
            );
        }

        .tap-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 82px;
          height: 82px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.7);
          background: rgba(0,0,0,.35);
          box-shadow:
            0 0 40px rgba(255,0,100,.35);
          animation: tapPulse 2s ease-in-out infinite;
        }

        @keyframes tapPulse {

          0%,100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.08);
          }

        }

        .tap-circle span {
          color: white;
          font-size: 25px;
        }

        .poster-overlay p {
          margin:
            20px
            0
            0;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .35em;
        }

        .poster-overlay small {
          margin-top: 8px;
          font-size: 7px;
          letter-spacing: .2em;
          color: rgba(255,255,255,.45);
        }

        .poster-shine {
          position: absolute;
          inset: 0;
          z-index: 15;
          pointer-events: none;
          background:
            linear-gradient(
              110deg,
              transparent 25%,
              rgba(255,255,255,.22) 45%,
              transparent 65%
            );
          transform: translateX(-120%);
          animation: posterShine 7s ease-in-out infinite;
        }

        @keyframes posterShine {

          0%,55% {
            transform: translateX(-120%);
          }

          75%,100% {
            transform: translateX(120%);
          }

        }

        .poster-corner {
          position: absolute;
          z-index: 20;
          width: 27px;
          height: 27px;
          border-color: #ffd765;
        }

        .top-left {
          top: 12px;
          left: 12px;
          border-top: 2px solid;
          border-left: 2px solid;
        }

        .top-right {
          top: 12px;
          right: 12px;
          border-top: 2px solid;
          border-right: 2px solid;
        }

        .bottom-left {
          bottom: 12px;
          left: 12px;
          border-bottom: 2px solid;
          border-left: 2px solid;
        }

        .bottom-right {
          bottom: 12px;
          right: 12px;
          border-bottom: 2px solid;
          border-right: 2px solid;
        }

        .scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-top: 28px;
          color: #555;
        }

        .scroll-hint span {
          font-size: 7px;
          letter-spacing: .35em;
        }

        .scroll-hint b {
          font-size: 15px;
          animation: bounce 1.5s infinite;
        }

        @keyframes bounce {

          0%,100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(7px);
          }

        }


        /* =====================================================
           INVITATION
        ===================================================== */

        .invitation {
          position: relative;
          padding:
            150px
            20px;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,.06);
          background:
            radial-gradient(
              circle at 50% 20%,
              rgba(255,0,100,.09),
              transparent 38%
            );
        }

        .section-container {
          position: relative;
          z-index: 10;
          width: min(100%, 1100px);
          margin: auto;
        }

        .eyebrow {
          margin: 0;
          text-align: center;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .5em;
          color: #ff67a5;
        }

        .gold-divider {
          margin-top: 25px;
        }

        .invitation-heading {
          margin:
            35px
            0
            0;
          text-align: center;
          font-family: Georgia, serif;
          font-size: clamp(62px, 12vw, 130px);
          line-height: .82;
          font-weight: 400;
        }

        .invitation-heading span {
          background:
            linear-gradient(
              90deg,
              #ffd96b,
              #ff4f9e,
              #a05cff
            );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .invitation-description {
          max-width: 550px;
          margin:
            30px
            auto
            0;
          text-align: center;
          color: #777;
          font-size: 14px;
          line-height: 1.8;
        }

        .invitation-card {
          width: min(100%, 850px);
          margin:
            60px
            auto
            0;
          padding:
            55px
            35px;
          text-align: center;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 35px;
          background:
            linear-gradient(
              145deg,
              rgba(255,0,100,.06),
              rgba(100,30,255,.04)
            ),
            rgba(255,255,255,.025);
          backdrop-filter: blur(25px);
          box-shadow:
            0 50px 120px rgba(0,0,0,.55),
            inset 0 1px rgba(255,255,255,.05);
        }

        .card-logo {
          width: 115px;
          height: 115px;
          margin: auto;
          padding: 5px;
          border: 1px solid rgba(255,215,100,.4);
          border-radius: 50%;
          background: rgba(0,0,0,.5);
          box-shadow:
            0 0 50px rgba(255,180,0,.12);
        }

        .card-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .card-college {
          margin:
            25px
            0
            0;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .3em;
        }

        .card-college-small {
          margin:
            8px
            0
            0;
          font-size: 7px;
          letter-spacing: .25em;
          color: #777;
        }

        .card-line {
          width: 100%;
          height: 1px;
          margin:
            30px
            auto;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,0,120,.5),
              transparent
            );
        }

        .cordially {
          margin: 0;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .4em;
          color: #ff9dc4;
        }

        .invitation-card h3 {
          margin:
            20px
            0
            0;
          font-family: Georgia, serif;
          font-size: clamp(40px, 7vw, 70px);
          font-weight: 400;
        }

        .invitation-card h3 span {
          color: #ffd86a;
        }

        .card-party {
          margin:
            10px
            0
            0;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .35em;
          color: #a76aff;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 10px;
          margin-top: 45px;
        }

        .detail {
          min-height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 18px;
          background: rgba(255,255,255,.025);
        }

        .detail span {
          font-size: 7px;
          letter-spacing: .3em;
          color: #666;
        }

        .detail strong {
          margin-top: 10px;
          font-size: 11px;
          letter-spacing: .12em;
        }

        .detail small {
          margin-top: 6px;
          font-size: 7px;
          letter-spacing: .2em;
          color: #a868ff;
        }

        .quote {
          margin:
            38px
            0
            0;
          font-family: Georgia, serif;
          font-size: 17px;
          font-style: italic;
          color: #e5c978;
        }

        .organized {
          margin:
            30px
            0
            0;
          text-align: center;
          font-size: 7px;
          font-weight: 800;
          letter-spacing: .4em;
          color: #444;
        }

        .invitation-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
        }

        .invitation-orb-one {
          width: 400px;
          height: 400px;
          left: -200px;
          top: 20%;
          background: rgba(255,0,90,.1);
        }

        .invitation-orb-two {
          width: 450px;
          height: 450px;
          right: -250px;
          bottom: 5%;
          background: rgba(110,30,255,.1);
        }


        /* =====================================================
           COUNTDOWN
        ===================================================== */

        .countdown-section {
          padding:
            120px
            20px;
          border-top: 1px solid rgba(255,255,255,.06);
        }

        .countdown-container h2 {
          margin:
            30px
            0
            0;
          text-align: center;
          font-family: Georgia, serif;
          font-size: clamp(42px, 7vw, 75px);
          font-weight: 400;
        }

        .countdown-container h2 span {
          color: #ff589f;
        }

        .countdown-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 12px;
          max-width: 800px;
          margin:
            55px
            auto
            0;
        }

        .countdown-box {
          padding:
            25px
            10px;
          text-align: center;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 22px;
          background: rgba(255,255,255,.025);
          backdrop-filter: blur(15px);
        }

        .countdown-number {
          font-size: clamp(27px,5vw,50px);
          font-weight: 900;
          background:
            linear-gradient(
              90deg,
              #ffd86a,
              #ff4c99,
              #9b5cff
            );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .countdown-label {
          margin-top: 8px;
          font-size: 7px;
          font-weight: 800;
          letter-spacing: .3em;
          color: #555;
        }


        /* =====================================================
           FILM STRIP
        ===================================================== */

        .film-strip {
          overflow: hidden;
          padding: 25px 0;
          border-top: 1px solid rgba(255,255,255,.06);
          border-bottom: 1px solid rgba(255,255,255,.06);
          background: #08050b;
        }

        .film-track {
          display: flex;
          width: max-content;
          animation:
            filmMove
            30s
            linear
            infinite;
        }

        .film-item {
          display: flex;
          align-items: center;
          gap: 30px;
          padding:
            0
            30px;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .4em;
          color: rgba(255,255,255,.2);
        }

        .film-item b {
          color: #ff438e;
        }

        @keyframes filmMove {

          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }

        }


        /* =====================================================
           REEL
        ===================================================== */

        .reel-section {
          padding:
            150px
            20px;
        }

        .reel-heading {
          text-align: center;
        }

        .reel-heading h2 {
          margin:
            30px
            0
            0;
          font-family: Georgia, serif;
          font-size: clamp(55px, 9vw, 100px);
          font-weight: 400;
          line-height: .85;
        }

        .reel-heading h2 span {
          background:
            linear-gradient(
              90deg,
              #ffd86a,
              #ff4f9c,
              #9a5cff
            );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .reel-heading > p:last-child {
          max-width: 500px;
          margin:
            28px
            auto
            0;
          color: #666;
          font-size: 13px;
          line-height: 1.8;
        }

        .reel-frame {
          width: min(100%, 950px);
          margin:
            55px
            auto
            0;
          padding: 10px;
          border-radius: 32px;
          background:
            linear-gradient(
              135deg,
              rgba(255,0,100,.2),
              rgba(110,30,255,.2),
              rgba(255,190,0,.1)
            );
          box-shadow:
            0 50px 130px rgba(0,0,0,.75),
            0 0 90px rgba(255,0,100,.08);
        }

        .reel-top,
        .reel-bottom {
          display: flex;
          justify-content: space-between;
          padding:
            10px
            6px;
          font-size: 7px;
          font-weight: 800;
          letter-spacing: .3em;
          color: #555;
        }

        .reel-top span:first-child,
        .reel-bottom span:first-child {
          color: #ff4d98;
        }

        .video-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 23px;
          background: black;
        }

        .video-wrapper video {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          background: black;
        }

        .video-hint {
          position: absolute;
          inset: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-hint div {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 68px;
          height: 68px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.5);
          background: rgba(0,0,0,.35);
          backdrop-filter: blur(10px);
          box-shadow:
            0 0 40px rgba(255,0,100,.25);
          font-size: 18px;
          animation:
            videoPulse
            2s
            ease-in-out
            infinite;
        }

        @keyframes videoPulse {

          0%,100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.08);
          }

        }

        .audio-note {
          margin:
            20px
            0
            0;
          text-align: center;
          font-size: 7px;
          letter-spacing: .3em;
          color: #444;
        }


        /* =====================================================
           ERAS
        ===================================================== */

        .eras-section {
          padding:
            150px
            20px;
          border-top: 1px solid rgba(255,255,255,.06);
        }

        .eras-heading {
          text-align: center;
        }

        .eras-heading h2 {
          margin:
            30px
            0
            0;
          font-family: Georgia, serif;
          font-size: clamp(55px, 9vw, 100px);
          font-weight: 400;
          line-height: .85;
        }

        .eras-heading h2 span {
          background:
            linear-gradient(
              90deg,
              #ffce62,
              #ff4d99,
              #955cff
            );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .eras-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 18px;
          margin-top: 70px;
        }

        .era-card {
          position: relative;
          min-height: 280px;
          padding: 35px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 30px;
          background:
            radial-gradient(
              circle at top right,
              rgba(255,0,100,.08),
              transparent 35%
            ),
            rgba(255,255,255,.025);
          transition: all .6s ease;
        }

        .era-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255,0,120,.35);
          box-shadow:
            0 30px 80px rgba(255,0,100,.08);
        }

        .era-number {
          position: absolute;
          top: 25px;
          right: 30px;
          font-size: 50px;
          font-weight: 900;
          color: rgba(255,255,255,.03);
        }

        .era-card h3 {
          margin: 30px 0 0;
          font-family: Georgia, serif;
          font-size: 65px;
          font-weight: 400;
          color: #ff579d;
        }

        .era-card h4 {
          margin:
            5px
            0
            0;
          font-size: 10px;
          letter-spacing: .3em;
        }

        .era-card p {
          max-width: 400px;
          margin:
            18px
            0
            0;
          color: #666;
          font-size: 12px;
          line-height: 1.8;
        }

        .era-line {
          position: absolute;
          left: 35px;
          bottom: 30px;
          width: 40px;
          height: 2px;
          background:
            linear-gradient(
              90deg,
              #ff3184,
              #8244ff
            );
          transition: width .5s ease;
        }

        .era-card:hover .era-line {
          width: 100px;
        }


        /* =====================================================
           EXPERIENCE
        ===================================================== */

        .experience {
          position: relative;
          padding:
            160px
            20px;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,.06);
        }

        .experience-glow {
          position: absolute;
          width: 650px;
          height: 650px;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(255,0,100,.15),
              rgba(100,30,255,.07),
              transparent 65%
            );
          filter: blur(30px);
          animation:
            experiencePulse
            6s
            ease-in-out
            infinite;
        }

        @keyframes experiencePulse {

          0%,100% {
            transform:
              translate(-50%,-50%)
              scale(.9);
          }

          50% {
            transform:
              translate(-50%,-50%)
              scale(1.08);
          }

        }

        .experience-content {
          text-align: center;
        }

        .experience h2 {
          margin:
            35px
            0
            0;
          font-family: Georgia, serif;
          font-size: clamp(55px, 9vw, 100px);
          font-weight: 400;
          line-height: .85;
        }

        .experience h2 span {
          background:
            linear-gradient(
              90deg,
              #ffd568,
              #ff4d99,
              #9a5cff
            );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .experience-description {
          max-width: 600px;
          margin:
            35px
            auto
            0;
          color: #666;
          font-size: 14px;
          line-height: 1.9;
        }

        .experience-grid {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 14px !important;
    width: 100% !important;
    max-width: 100% !important;
    margin-top: 40px !important;
  }

  .experience-card {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    padding: 30px 20px !important;
  }

  .experience-card h3 {
    font-size: 38px !important;
    white-space: normal !important;
  }

  .experience-card p {
    font-size: 13px !important;
    line-height: 1.7 !important;
  }
}


        /* =====================================================
           FINAL
        ===================================================== */

        .final-section {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding:
            100px
            20px;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,.06);
        }

        .final-glow {
          position: absolute;
          width: 700px;
          height: 700px;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(255,0,100,.18),
              rgba(110,30,255,.08),
              transparent 65%
            );
          filter: blur(30px);
        }

        .final-content {
          position: relative;
          z-index: 10;
          text-align: center;
        }

        .final-logo {
          width: 90px;
          height: 90px;
          margin: auto;
          padding: 5px;
          border-radius: 50%;
          border: 1px solid rgba(255,0,120,.35);
          background: black;
          box-shadow:
            0 0 70px rgba(255,0,120,.18);
        }

        .final-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .final-content .eyebrow {
          margin-top: 35px;
        }

        .final-content h2 {
          margin:
            35px
            0
            0;
          font-family: Georgia, serif;
          font-size: clamp(75px, 13vw, 160px);
          line-height: .8;
          font-weight: 400;
        }

        .final-text {
          margin:
            30px
            0
            0;
          color: #666;
          font-size: 13px;
          line-height: 2;
        }

        .final-date {
          display: inline-block;
          margin-top: 35px;
          padding:
            15px
            30px;
          border: 1px solid rgba(255,0,120,.35);
          border-radius: 999px;
          background: rgba(255,0,100,.06);
          color: #ffc4d9;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .35em;
          box-shadow:
            0 0 35px rgba(255,0,100,.08);
        }

        .final-organized {
          margin:
            45px
            0
            0;
          font-size: 7px;
          font-weight: 800;
          letter-spacing: .4em;
          color: #333;
        }


        /* =====================================================
           FOOTER
        ===================================================== */

        .footer {
          padding:
            30px
            20px;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,.05);
        }

        .footer p {
          margin: 0;
          font-size: 7px;
          font-weight: 800;
          letter-spacing: .25em;
          color: #444;
        }

        .footer span {
          display: block;
          margin-top: 12px;
          font-size: 7px;
          letter-spacing: .25em;
          color: #222;
        }


       /* =========================================================
   FINAL MOBILE TYPOGRAPHY
   ========================================================= */

@media (max-width: 700px) {

  /* College name */
  .college-branding h2 {
    font-size: 26px !important;
    line-height: 1.2;
    letter-spacing: .04em;
  }

  .college-branding h3 {
    font-size: 14px !important;
    line-height: 1.5;
    letter-spacing: .10em;
  }

  /* PRESENTS / small headings */
  .presented p {
    font-size: 10px !important;
  }

  .freshers-label {
    font-size: 11px !important;
  }

  /* ESPERANZA */
  .event-heading h1 {
    font-size: clamp(38px, 13vw, 56px) !important;
    line-height: .9;
    letter-spacing: 0 !important;
    white-space: nowrap;
    width: 100%;
    text-align: center;
  }

  .four-point-zero b {
    font-size: 28px !important;
  }

  .bollywood {
    font-size: 13px !important;
  }

  .eras {
    font-size: 8px !important;
  }


  /* =====================================================
     INVITATION PAGE
     ===================================================== */

  /* CORDIALLY INVITES YOU TO */
  .eyebrow {
    font-size: 10px !important;
    letter-spacing: .25em;
    line-height: 1.6;
  }

  /* Esperanza 4.0 heading */
  .invitation-heading {
    font-size: clamp(54px, 17vw, 72px) !important;
    line-height: .9;
  }

  /* Description */
  .invitation-description {
    font-size: 15px !important;
    line-height: 1.75;
  }


  /* Invitation card college name */
  .card-college {
    font-size: 12px !important;
    letter-spacing: .12em;
    line-height: 1.5;
  }

  .card-college-small {
    font-size: 9px !important;
    letter-spacing: .10em;
    line-height: 1.6;
  }

  .cordially {
  font-size: 10px !important;
  letter-spacing: .22em;
}

  /* FRESHERS PARTY • 2K26 */
  .card-party {
    font-size: 9px !important;
    letter-spacing: .14em;
    line-height: 1.7;
  }

  /* Date / Venue / Theme labels */
  .detail strong {
  font-size: 15px !important;
  letter-spacing: .08em;
}

  /* 25 SEP / AUDITORIUM / BOLLYWOOD */
  .detail strong {
    font-size: 15px !important;
    letter-spacing: .08em;
  }

  /* 2026 / SRMS IBS / 90s → NOW */
  .detail small {
    font-size: 8px !important;
    letter-spacing: .15em;
  }

  /* Quote */
  .quote {
    font-size: 17px !important;
    line-height: 1.5;
  }

  .organized {
    font-size: 8px !important;
    letter-spacing: .18em;
    line-height: 1.7;
  }


  /* =====================================================
     COUNTDOWN
     ===================================================== */

  .countdown-container h2 {
    font-size: clamp(42px, 12vw, 55px) !important;
  }

  .countdown-number {
    font-size: 32px !important;
  }

  .countdown-label {
    font-size: 8px !important;
    letter-spacing: .12em;
  }


  /* =====================================================
     REEL / ERAS / EXPERIENCE
     ===================================================== */

  .reel-heading h2,
  .eras-heading h2,
  .experience h2 {
    font-size: clamp(48px, 14vw, 68px) !important;
  }

  .reel-heading > p:last-child,
  .experience-description {
    font-size: 14px !important;
    line-height: 1.8;
  }

  .era-card h3 {
    font-size: 50px !important;
  }

  .era-card p {
    font-size: 13px !important;
    line-height: 1.75;
  }


  /* =====================================================
     FINAL SECTION
     ===================================================== */

  .final-text {
    font-size: 13px !important;
    line-height: 1.9;
  }

  .final-date {
    font-size: 9px !important;
  }

  .final-organized {
    font-size: 8px !important;
  }

  .footer p,
  .footer span {
    font-size: 7px !important;
    line-height: 1.7;
  }
}

          .music-control {
            right: 10px;
            bottom: 10px;
            padding: 6px 10px 6px 6px;
            font-size: 7px;
          }

          .music-icon {
            width: 28px;
            height: 28px;
          }
        }

        @media (max-width: 380px) {
          .header-inner {
            width: calc(100% - 18px);
          }

          .brand {
            max-width: 60%;
          }

          .brand-title {
            font-size: 8px;
          }

          .event-pill {
            font-size: 6px;
            padding: 7px 9px;
          }

          .hero {
            padding-left: 10px;
            padding-right: 10px;
          }

          .event-heading h1 {
  font-size: clamp(38px, 13vw, 56px);
  line-height: .9;
  letter-spacing: -0.01em;
  white-space: nowrap;
  width: 100%;
  text-align: center;
}

          .invitation {
            padding-left: 10px;
            padding-right: 10px;
          }

          .invitation-card {
            padding-left: 12px;
            padding-right: 12px;
          }

          .invitation-heading {
            font-size: 50px;
          }
        }

      `}</style>

    </main>
  );
}