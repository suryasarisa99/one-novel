import "./about.scss";

import React, { useState, useEffect, useRef } from "react";

export default function AboutPage() {
  return (
    <div className="about-page page">
      <section className="sec1">
        <h1>About One Novel</h1>
        <div>
          <p>
            Welcome to One Novel, your ultimate platform for writers to showcase
            their talent and achieve financial success! We are dedicated to
            supporting budding and experienced writers through our unique Writer
            Benefit Programme. Our goal is to empower writers by providing them
            with opportunities to earn rewards, gain recognition, and build a
            community of literary enthusiasts.
          </p>
        </div>
      </section>
      <section className="sec2">
        <h1>Writer Benefit Programme</h1>
        <div className="flex">
          <div className="left">
            The Writer Benefit Programme is designed to help writers achieve
            their dreams by writing and uploading their stories on One Novel.
            Here’s how it works
          </div>
          <div className="right">
            <div>
              <div className="title">Write and Upload</div>
              <p>
                Writers can submit their stories of any genre with a minimum
                word length of 30,000 words.
              </p>
            </div>
            <div>
              <div className="title">Review and Acceptance</div>
              <p>
                Our dedicated One Novel team reviews each submission to ensure
                it meets our quality standards.
              </p>
            </div>
            <div>
              <div className="title">Rewards</div>
              <p>
                Upon acceptance, writers can earn rewards of up to 5,000 per
                story.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec3">
        <h1> Financial Success through Our MLM Scheme</h1>
        <div>
          <p>
            At One Novel, we believe in rewarding not just the creators but also
            those who help expand our community. We’ve implemented a Multi-Level
            Marketing (MLM) scheme that allows users to earn commissions and
            vouchers as they progress through various levels.
          </p>
          <div>
            <div className="title">How the MLM Scheme Works</div>
            <div className="inner-section">
              <div className="title">Initial Purchase</div>
              <p>
                To join the MLM programme, a user must purchase a book from One
                Novel for 5,000.
              </p>
            </div>
            <div className="inner-section">
              <div className="title">Direct Sales</div>
              <p>
                The user then needs to make 5 direct sales. For each sale, the
                user earns a 20% commission (1,000).
              </p>
            </div>
            <div className="inner-section">
              <div className="title">Downline Sales</div>
              <div>
                <div className="level">Level 1</div>
                <p>
                  When the direct recruits make their sales, the original user
                  earns an additional 20% commission on each of their sales.
                </p>
                <div className="level">Level 2</div>
                <p>
                  This process continues with each level generating commissions
                  from the sales made by the downline, up to Level 4.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec4">
        <h1>Vouchers for Level Completion</h1>
      </section>
      <section>
        <h1>Our Commitment</h1>
      </section>
    </div>
  );
}
