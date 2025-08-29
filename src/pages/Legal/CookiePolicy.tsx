const CookiePolicy = () => {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">Last updated: August 24, 2025</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">1. What Are Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">2. How We Use Cookies</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              We use different types of cookies for various purposes:
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-medium">2.1 Essential Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
              </p>

              <h3 className="text-xl font-medium">2.2 Analytics Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                We use analytics cookies to help us understand how visitors interact with our website, helping us improve our services and user experience.
              </p>

              <h3 className="text-xl font-medium">2.3 Functional Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">3. Managing Cookies</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience using our website.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              To manage cookies in your browser:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Chrome: Settings → Privacy and Security → Cookies</li>
              <li>Firefox: Options → Privacy & Security → Cookies</li>
              <li>Safari: Preferences → Privacy → Cookies</li>
              <li>Edge: Settings → Privacy & Security → Cookies</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">4. Third-Party Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            Some of our pages may contain content from third-party services (like social media or analytics providers) which may set their own cookies. We do not control these cookies and recommend checking the privacy policies of these third parties.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">5. Updates to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">6. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about our Cookie Policy, please contact us at:
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

export default CookiePolicy;
