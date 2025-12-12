import Layout from "@/components/Layout";

export const metadata = {
    title: "Privacy Policy | NanoBrief",
    description: "Privacy Policy for NanoBrief - How we collect, use, and protect your data",
};

export default function PrivacyPage() {
    return (
        <Layout>
            <div className="section">
                <div className="center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-h1 mb-4">Privacy Policy</h1>
                        <p className="text-body text-t-tertiary mb-12">
                            Last updated: December 11, 2025
                        </p>

                        <div className="prose prose-lg max-w-none">
                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">1. Introduction</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    NanoBrief ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered brief generation service.
                                </p>
                                <p className="text-body text-t-secondary">
                                    Please read this policy carefully. By using NanoBrief, you consent to the practices described in this Privacy Policy.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">2. Information We Collect</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    <strong>Account Information:</strong> When you create an account, we collect your name, email address, and authentication credentials (including information from Google if you use social login).
                                </p>
                                <p className="text-body text-t-secondary mb-4">
                                    <strong>Brief Content:</strong> We collect the information you provide when creating briefs, including project details, client information, and any other data you input into our questionnaires.
                                </p>
                                <p className="text-body text-t-secondary mb-4">
                                    <strong>Usage Data:</strong> We automatically collect information about how you interact with our Service, including pages visited, features used, and time spent on the platform.
                                </p>
                                <p className="text-body text-t-secondary">
                                    <strong>Device Information:</strong> We collect information about the device you use to access our Service, including IP address, browser type, operating system, and device identifiers.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">3. How We Use Your Information</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary">Provide, maintain, and improve our Service</li>
                                    <li className="text-body text-t-secondary">Generate AI-powered briefs based on your inputs</li>
                                    <li className="text-body text-t-secondary">Process transactions and send related information</li>
                                    <li className="text-body text-t-secondary">Send you technical notices, updates, and support messages</li>
                                    <li className="text-body text-t-secondary">Respond to your comments, questions, and requests</li>
                                    <li className="text-body text-t-secondary">Monitor and analyze trends, usage, and activities</li>
                                    <li className="text-body text-t-secondary">Detect, investigate, and prevent fraudulent or unauthorized activity</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">4. AI Processing</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    NanoBrief uses third-party AI services (including Anthropic's Claude) to generate briefs. When you create a brief:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary">Your input data is sent to AI providers for processing</li>
                                    <li className="text-body text-t-secondary">AI providers may temporarily process your data but do not retain it for training purposes</li>
                                    <li className="text-body text-t-secondary">Generated content is stored in our secure database</li>
                                </ul>
                                <p className="text-body text-t-secondary">
                                    We do not use your brief content to train AI models. Your data remains yours.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">5. Information Sharing</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    We do not sell your personal information. We may share your information in the following circumstances:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary"><strong>Service Providers:</strong> With vendors who perform services on our behalf (hosting, analytics, payment processing)</li>
                                    <li className="text-body text-t-secondary"><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                                    <li className="text-body text-t-secondary"><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                                    <li className="text-body text-t-secondary"><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">6. Data Security</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    We implement appropriate technical and organizational measures to protect your information, including:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary">Encryption of data in transit and at rest</li>
                                    <li className="text-body text-t-secondary">Secure authentication mechanisms</li>
                                    <li className="text-body text-t-secondary">Regular security assessments</li>
                                    <li className="text-body text-t-secondary">Access controls and monitoring</li>
                                </ul>
                                <p className="text-body text-t-secondary">
                                    However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">7. Your Rights</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    Depending on your location, you may have the following rights:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary"><strong>Access:</strong> Request a copy of your personal data</li>
                                    <li className="text-body text-t-secondary"><strong>Correction:</strong> Request correction of inaccurate data</li>
                                    <li className="text-body text-t-secondary"><strong>Deletion:</strong> Request deletion of your data</li>
                                    <li className="text-body text-t-secondary"><strong>Portability:</strong> Request transfer of your data</li>
                                    <li className="text-body text-t-secondary"><strong>Objection:</strong> Object to certain processing of your data</li>
                                </ul>
                                <p className="text-body text-t-secondary">
                                    To exercise these rights, please contact us at privacy@nanobrief.app.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">8. Data Retention</h2>
                                <p className="text-body text-t-secondary">
                                    We retain your information for as long as your account is active or as needed to provide you services. You can delete your account and associated data at any time through your account settings. Some information may be retained for legal or legitimate business purposes.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">9. Children's Privacy</h2>
                                <p className="text-body text-t-secondary">
                                    NanoBrief is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn we have collected such information, we will delete it promptly.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">10. Changes to This Policy</h2>
                                <p className="text-body text-t-secondary">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the updated policy.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-h3 mb-4">11. Contact Us</h2>
                                <p className="text-body text-t-secondary">
                                    If you have any questions about this Privacy Policy, please contact us at{" "}
                                    <a href="mailto:privacy@nanobrief.app" className="text-primary1 hover:underline">
                                        privacy@nanobrief.app
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
