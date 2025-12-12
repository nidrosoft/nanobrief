"use client";

import Layout from "@/components/Layout";
import Pricing from "@/components/Pricing";
import Hero from "./Hero";
import LogoBar from "./LogoBar";
import HowItWorks from "./HowItWorks";
import Industries from "./Industries";
import Features from "./Features";
import About from "./About";
import AIDemo from "./AIDemo";
import UseCases from "./UseCases";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Start from "./Start";

const HomePage = () => {
    return (
        <Layout>
            <Hero />
            <LogoBar />
            <HowItWorks />
            <Industries />
            <Features />
            <About />
            <AIDemo />
            <UseCases />
            <Testimonials />
            <Pricing
                className="section"
                title="Simple, transparent pricing"
            />
            <FAQ />
            <Start />
        </Layout>
    );
};

export default HomePage;
