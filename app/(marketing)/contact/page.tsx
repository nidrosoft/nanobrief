import Layout from "@/components/Layout";
import { Send } from "iconsax-react";

export const metadata = {
    title: "Contact Us | NanoBrief",
    description: "Get in touch with the NanoBrief team",
};

export default function ContactPage() {
    return (
        <Layout>
            <div className="section">
                <div className="center">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-h1 mb-4">Contact Us</h1>
                        <p className="text-body-lg text-t-secondary mb-12">
                            Have questions or feedback? We'd love to hear from you.
                        </p>

                        <div className="grid grid-cols-1 gap-6 mb-12">
                            <div className="p-8 bg-b-surface2 rounded-3xl">
                                <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-primary1/10 rounded-2xl">
                                    <Send size={28} variant="Bold" color="#2d68ff" />
                                </div>
                                <h3 className="text-body-lg-bold mb-2">Email Us</h3>
                                <p className="text-body text-t-secondary mb-4">
                                    For general inquiries, support, or feedback
                                </p>
                                <a
                                    href="mailto:hello@nanobrief.app"
                                    className="text-primary1 hover:underline text-body-bold"
                                >
                                    hello@nanobrief.app
                                </a>
                            </div>
                        </div>

                        <div className="p-6 bg-b-subtle rounded-2xl">
                            <p className="text-body text-t-secondary">
                                <strong>Response Time:</strong> We typically respond within 24-48 hours during business days.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
