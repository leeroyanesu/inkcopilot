const Terms = () => {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: August 24, 2025</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using InkCopilot's services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">2. Service Description</h2>
          <p className="text-muted-foreground leading-relaxed">
            InkCopilot provides AI-powered content creation and automation services. Our platform helps users generate, optimize, and manage content through various tools and features.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">3. User Accounts</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              When you create an account with us, you must provide accurate and complete information. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Maintaining the security of your account</li>
              <li>All activities that occur under your account</li>
              <li>Keeping your password secure</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">4.1 Our Rights</h3>
            <p className="text-muted-foreground leading-relaxed">
              The service and its original content, features, and functionality are owned by InkCopilot and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-medium">4.2 User Content</h3>
            <p className="text-muted-foreground leading-relaxed">
              You retain ownership of any content you create using our services. However, you grant us a license to use, store, and display your content in connection with providing and improving our services.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">5. Acceptable Use</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              You agree not to use our service for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Any unlawful purpose</li>
              <li>Generating harmful or malicious content</li>
              <li>Spamming or automated abuse of the service</li>
              <li>Violating any third-party rights</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">6. Payment Terms</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Some aspects of the Service are provided for a fee. You agree to pay all fees associated with your chosen subscription plan. We may modify fees upon reasonable notice.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            InkCopilot shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes and the opportunity to review and accept the modified Terms.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">9. Contact Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="text-muted-foreground">
            Email: legal@inkcopilot.com<br />
            Address: Your Business Address
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
