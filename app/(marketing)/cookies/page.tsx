import Layout from "@/components/Layout";

export const metadata = {
    title: "Cookie Policy | NanoBrief",
    description: "Cookie Policy for NanoBrief - How we use cookies and similar technologies",
};

export default function CookiesPage() {
    return (
        <Layout>
            <div className="section">
                <div className="center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-h1 mb-4">Cookie Policy</h1>
                        <p className="text-body text-t-tertiary mb-12">
                            Last updated: December 11, 2025
                        </p>

                        <div className="prose prose-lg max-w-none">
                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">1. What Are Cookies</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                                </p>
                                <p className="text-body text-t-secondary">
                                    This Cookie Policy explains how NanoBrief uses cookies and similar technologies to recognize you when you visit our platform.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">2. Types of Cookies We Use</h2>
                                
                                <h3 className="text-body-lg-bold mb-3 mt-6">Essential Cookies</h3>
                                <p className="text-body text-t-secondary mb-4">
                                    These cookies are necessary for the website to function properly. They enable core functionality such as security, authentication, and session management. You cannot opt out of these cookies.
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary">Authentication cookies to keep you logged in</li>
                                    <li className="text-body text-t-secondary">Security cookies to prevent fraud</li>
                                    <li className="text-body text-t-secondary">Session cookies to remember your preferences during a visit</li>
                                </ul>

                                <h3 className="text-body-lg-bold mb-3 mt-6">Functional Cookies</h3>
                                <p className="text-body text-t-secondary mb-4">
                                    These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary">Theme preference (light/dark mode)</li>
                                    <li className="text-body text-t-secondary">Language preferences</li>
                                    <li className="text-body text-t-secondary">Recently viewed items</li>
                                </ul>

                                <h3 className="text-body-lg-bold mb-3 mt-6">Analytics Cookies</h3>
                                <p className="text-body text-t-secondary mb-4">
                                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary">Pages visited and time spent</li>
                                    <li className="text-body text-t-secondary">Features used</li>
                                    <li className="text-body text-t-secondary">Error tracking</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">3. Third-Party Cookies</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    We may use third-party services that set their own cookies. These include:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary"><strong>Supabase:</strong> Authentication and database services</li>
                                    <li className="text-body text-t-secondary"><strong>Vercel:</strong> Hosting and analytics</li>
                                    <li className="text-body text-t-secondary"><strong>Stripe:</strong> Payment processing (if applicable)</li>
                                </ul>
                                <p className="text-body text-t-secondary">
                                    These third parties have their own privacy policies governing their use of cookies.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">4. Managing Cookies</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    Most web browsers allow you to control cookies through their settings. You can:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary">View what cookies are stored on your device</li>
                                    <li className="text-body text-t-secondary">Delete all or specific cookies</li>
                                    <li className="text-body text-t-secondary">Block cookies from being set</li>
                                    <li className="text-body text-t-secondary">Set preferences for certain websites</li>
                                </ul>
                                <p className="text-body text-t-secondary">
                                    Please note that blocking essential cookies may affect the functionality of our Service.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">5. Browser-Specific Instructions</h2>
                                <p className="text-body text-t-secondary mb-4">
                                    To manage cookies in your browser:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li className="text-body text-t-secondary"><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                                    <li className="text-body text-t-secondary"><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                                    <li className="text-body text-t-secondary"><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                                    <li className="text-body text-t-secondary"><strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-h3 mb-4">6. Updates to This Policy</h2>
                                <p className="text-body text-t-secondary">
                                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page periodically to stay informed about our use of cookies.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-h3 mb-4">7. Contact Us</h2>
                                <p className="text-body text-t-secondary">
                                    If you have any questions about our use of cookies, please contact us at{" "}
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
