import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Tech Blogger",
    company: "TechInsights",
    content: "This platform has completely transformed how I manage my content calendar. I went from publishing 3 articles per week to 15, while maintaining the same quality standards.",
    avatar: "SC",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Content Marketing Manager",
    company: "GrowthCorp",
    content: "The WordPress integration is seamless. Our team can now focus on strategy while the AI handles the heavy lifting of content production. ROI has been incredible.",
    avatar: "MR",
    rating: 5
  },
  {
    name: "Emily Thompson",
    role: "Independent Creator",
    company: "ThompsonWrites",
    content: "As a solo creator, I was drowning in content demands. This tool gave me my time back while actually improving my output quality. It's like having a full writing team.",
    avatar: "ET",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-card">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Loved by <span className="text-gradient">Content Creators</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of creators who've transformed their content workflow and scaled their reach.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="card-glow p-8 rounded-xl relative group hover:shadow-elegant transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="h-8 w-8 text-primary/30 mb-6" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-sm text-primary">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">50K+</div>
            <p className="text-muted-foreground">Articles Generated</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">2,500+</div>
            <p className="text-muted-foreground">Active Creators</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">95%</div>
            <p className="text-muted-foreground">Time Saved</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">4.9/5</div>
            <p className="text-muted-foreground">User Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;