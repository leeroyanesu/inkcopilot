const Privacy = () => {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: August 24, 2025</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            At InkCopilot, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our content automation platform and related services.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">2.1 Personal Information</h3>
            <p className="text-muted-foreground leading-relaxed">
              We collect information that you voluntarily provide when using InkCopilot, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Name and email address</li>
              <li>Billing information</li>
              <li>Account preferences</li>
              <li>Content and writing samples</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use the collected information for various purposes, including:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Providing and maintaining our services</li>
            <li>Personalizing your experience</li>
            <li>Processing your transactions</li>
            <li>Improving our AI algorithms</li>
            <li>Communicating with you about updates and offers</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">4. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">5. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed">
            You have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Access to your personal data</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your data</li>
            <li>Withdrawal of consent</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">6. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-muted-foreground">
            Email: privacy@inkcopilot.com<br />
            Address: Your Business Address
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
