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
    <section className="py-12 sm:py-24 px-4 sm:px-6 bg-gradient-card">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Loved by <span className="text-gradient">Content Creators</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of creators who've transformed their content workflow and scaled their reach.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="card-glow p-6 sm:p-8 rounded-xl relative group hover:shadow-elegant transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary/30 mb-4 sm:mb-6" />
              
              {/* Rating */}
              <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="text-sm sm:text-base text-foreground mb-4 sm:mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm sm:text-base">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs sm:text-sm text-primary">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10 sm:mt-16 pt-10 sm:pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1 sm:mb-2">50K+</div>
            <p className="text-sm sm:text-base text-muted-foreground">Articles Generated</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1 sm:mb-2">2,500+</div>
            <p className="text-sm sm:text-base text-muted-foreground">Active Creators</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1 sm:mb-2">95%</div>
            <p className="text-sm sm:text-base text-muted-foreground">Time Saved</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1 sm:mb-2">4.9/5</div>
            <p className="text-sm sm:text-base text-muted-foreground">User Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;