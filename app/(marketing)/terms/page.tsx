import Layout from "@/components/Layout";

export const metadata = {
    title: "Terms of Service | NanoBrief",
    description: "Terms of Service for NanoBrief - AI-powered project brief generation",
};

export default function TermsPage() {
    return (
        <Layout>
            <div className="section">
                <div className="center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-h1 mb-4">Terms of Service</h1>
                        <p className="text-body text-t-tertiary mb-12">
                            Last updated: December 11, 2025
                        </p>

                        <div className="prose prose-lg max-w-none">
                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">1. Acceptance of Terms</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    By accessing or using NanoBrief ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
                                </p>
                                <p className="text-body text-t-secondary">
                                    We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last updated" date.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">2. Description of Service</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    NanoBrief is an AI-powered platform that helps users create professional project briefs. Our Service uses artificial intelligence to generate comprehensive briefs based on user inputs across various industries including marketing, design, video production, and more.
                                </p>
                                <p className="text-body text-t-secondary">
                                    The Service is provided "as is" and we make no guarantees regarding the accuracy, completeness, or suitability of the generated content for any particular purpose.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">3. User Accounts</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    To access certain features of the Service, you must create an account. You are responsible for:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary">Maintaining the confidentiality of your account credentials</li>
                                    <li className="text-body text-t-secondary">All activities that occur under your account</li>
                                    <li className="text-body text-t-secondary">Providing accurate and complete registration information</li>
                                    <li className="text-body text-t-secondary">Notifying us immediately of any unauthorized use of your account</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">4. Subscription and Payments</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    NanoBrief offers both free and paid subscription plans. By subscribing to a paid plan, you agree to pay all applicable fees as described at the time of purchase.
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary">Subscriptions automatically renew unless cancelled before the renewal date</li>
                                    <li className="text-body text-t-secondary">Refunds are provided at our discretion and in accordance with applicable law</li>
                                    <li className="text-body text-t-secondary">We reserve the right to change pricing with 30 days notice</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">5. Intellectual Property</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    <strong>Your Content:</strong> You retain ownership of all content you input into the Service and the briefs generated based on your inputs. You grant us a limited license to process your content solely for the purpose of providing the Service.
                                </p>
                                <p className="text-body text-t-secondary">
                                    <strong>Our Content:</strong> The Service, including its design, features, and underlying technology, is owned by NanoBrief and protected by intellectual property laws. You may not copy, modify, or distribute any part of our Service without permission.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">6. Acceptable Use</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    You agree not to use the Service to:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary">Violate any applicable laws or regulations</li>
                                    <li className="text-body text-t-secondary">Generate content that is illegal, harmful, or infringes on others' rights</li>
                                    <li className="text-body text-t-secondary">Attempt to gain unauthorized access to our systems</li>
                                    <li className="text-body text-t-secondary">Interfere with or disrupt the Service</li>
                                    <li className="text-body text-t-secondary">Use automated systems to access the Service without permission</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">7. Limitation of Liability</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    To the maximum extent permitted by law, NanoBrief shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
                                </p>
                                <p className="text-body text-t-secondary">
                                    Our total liability for any claims arising from your use of the Service shall not exceed the amount you paid us in the twelve (12) months preceding the claim.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">8. Termination</h2>
                                <p className="text-body text-t-secondary">
                                    We may suspend or terminate your access to the Service at any time, with or without cause, with or without notice. Upon termination, your right to use the Service will immediately cease. You may also delete your account at any time through your account settings.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">9. Governing Law</h2>
                                <p className="text-body text-t-secondary">
                                    These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of competent jurisdiction.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-h3 mb-4">10. Contact Us</h2>
                                <p className="text-body text-t-secondary">
                                    If you have any questions about these Terms, please contact us at{" "}
                                    <a href="mailto:legal@nanobrief.app" className="text-primary1 hover:underline">
                                        legal@nanobrief.app
                                    </a>
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
