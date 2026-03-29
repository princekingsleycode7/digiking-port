document.addEventListener('DOMContentLoaded', function() {
    const root = document.getElementById('root');

    const timelineItems = [
      {
        date: '2020',
        title: 'Community Engagement Event',
        description:
          'Our community engagement event in 2020 brought together diverse voices. It was a pivotal moment for collaboration.',
        cta: {
          label: 'Join',
          action: 'Participate',
        },
      },
      {
        date: '2019',
        title: 'Partnership Development',
        description:
          'In 2019, we forged essential partnerships that expanded our reach. These collaborations were vital for our growth.',
        cta: {
          label: 'Connect',
          action: 'Engage',
        },
      },
      {
        date: '2018',
        title: 'First Initiative Launch',
        description:
          'Our first initiative in 2018 marked the beginning of our journey. It laid the groundwork for our mission.',
        cta: {
          label: 'Support',
          action: 'Donate',
        },
      },
    ];

    function createTimeline(items) {
        const timelineContainer = document.createElement('div');
        timelineContainer.className = 'relative w-full max-w-7xl mx-auto px-4 md:px-6 py-16';

        const line = document.createElement('div');
        line.className = 'absolute left-1/2 -translate-x-px h-full w-0.5 bg-border';
        timelineContainer.appendChild(line);

        const contentContainer = document.createElement('div');
        contentContainer.className = 'relative w-full space-y-24';

        items.forEach((item, index) => {
            const itemContainer = document.createElement('div');
            itemContainer.className = 'relative';

            const dot = document.createElement('div');
            dot.className = 'absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2';
            dot.innerHTML = `<div class="h-4 w-4 rounded-full bg-primary border-4 border-background" style="border-color: hsl(var(--background));"></div>`;
            itemContainer.appendChild(dot);

            const grid = document.createElement('div');
            grid.className = `grid md:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? 'md:grid-flow-dense' : ''}`;

            const textContent = document.createElement('div');
            textContent.className = `text-center md:text-left ${index % 2 === 0 ? 'md:col-start-2' : ''}`;
            textContent.innerHTML = `
                <h2 class="text-4xl font-bold mb-4">${item.date}</h2>
                <h3 class="text-2xl font-semibold mb-3">${item.title}</h3>
                <p class="text-muted-foreground mb-6">${item.description}</p>
                ${item.cta ? `
                <div class="flex items-center justify-center md:justify-start space-x-4">
                    <button class="bg-background border border-input hover:bg-accent hover:text-accent-foreground px-6 py-2 rounded-md">
                        ${item.cta.label}
                    </button>
                    <button class="text-primary hover:text-primary/80">
                        ${item.cta.action} →
                    </button>
                </div>` : ''}
            `;

            const imageContainer = document.createElement('div');
            imageContainer.className = `aspect-[4/3] bg-muted rounded-lg overflow-hidden ${index % 2 === 0 ? 'md:col-start-1' : ''}`;
            if (item.image) {
                imageContainer.innerHTML = `<img src="${item.image}" alt="" class="w-full h-full object-cover">`;
            } else {
                imageContainer.innerHTML = `<div class="w-full h-full flex items-center justify-center text-muted-foreground">placeholder</div>`;
            }

            grid.appendChild(textContent);
            grid.appendChild(imageContainer);
            itemContainer.appendChild(grid);
            contentContainer.appendChild(itemContainer);
        });

        timelineContainer.appendChild(contentContainer);
        return timelineContainer;
    }

    function createImpactSection() {
        const section = document.createElement('section');
        section.className = 'w-full py-16 px-4';
        section.innerHTML = `
            <div class="max-w-7xl mx-auto">
                <div class="mb-12">
                    <h4 class="text-sm font-semibold text-primary mb-4">Empower</h4>
                    <h2 class="text-3xl font-bold mb-4">Our Core Areas of Impact</h2>
                    <p class="text-muted-foreground max-w-2xl">
                        We focus on creating sustainable solutions that uplift communities. Our initiatives span across vital sectors to foster growth and well-being.
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <div class="flex flex-col items-start space-y-4">
                        <div class="p-2 rounded-full bg-muted"><i data-lucide="home" class="w-6 h-6"></i></div>
                        <h3 class="text-xl font-semibold">Community Development: Building Stronger Neighborhoods</h3>
                        <p class="text-muted-foreground">We enhance local resources and promote engagement</p>
                    </div>
                    <div class="flex flex-col items-start space-y-4">
                        <div class="p-2 rounded-full bg-muted"><i data-lucide="graduation-cap" class="w-6 h-6"></i></div>
                        <h3 class="text-xl font-semibold">Education: Empowering Future Generations</h3>
                        <p class="text-muted-foreground">We provide access to quality education for all</p>
                    </div>
                    <div class="flex flex-col items-start space-y-4">
                        <div class="p-2 rounded-full bg-muted"><i data-lucide="heart" class="w-6 h-6"></i></div>
                        <h3 class="text-xl font-semibold">Healthcare: Ensuring Wellness for Everyone</h3>
                        <p class="text-muted-foreground">We deliver essential health services to communities</p>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 class="text-3xl font-bold mb-4">Join Us in Making a Difference</h2>
                        <p class="text-muted-foreground mb-8">Your support can transform lives. Sponsor a project or make a donation today to help us.</p>
                        <div class="flex gap-4">
                            <button class="bg-primary text-primary-foreground px-6 py-2 rounded-md">Donate</button>
                            <button class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-2 rounded-md">Sponsor</button>
                        </div>
                    </div>
                    <div class="bg-muted aspect-video rounded-lg"></div>
                </div>
            </div>
        `;
        return section;
    }

    function createBlogSection() {
        const section = document.createElement('section');
        section.className = 'w-full py-16 px-4';
        const posts = [
            {
                category: 'Updates',
                title: 'Empowering Communities Through Education',
                excerpt: 'Learn how our educational programs are transforming lives and fostering growth.',
                author: { name: 'Jane Doe', date: '11 Jan 2022', readTime: '5 min read' },
            },
            {
                category: 'News',
                title: 'Sustainable Practices in Action',
                excerpt: 'Explore our initiatives promoting sustainability and environmental stewardship.',
                author: { name: 'John Smith', date: '15 Feb 2022', readTime: '6 min read' },
            },
            {
                category: 'Impact',
                title: "Celebrating Our Volunteers' Contributions",
                excerpt: 'Join us in recognizing the dedication of our amazing volunteers.',
                author: { name: 'Emily White', date: '20 Mar 2022', readTime: '4 min read' },
            },
        ];

        let postsHtml = posts.map(post => `
            <article class="flex flex-col space-y-4">
                <div class="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                    <div class="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">placeholder</div>
                </div>
                <div class="space-y-4">
                    <span class="text-sm text-muted-foreground">${post.category}</span>
                    <h3 class="text-xl font-semibold">${post.title}</h3>
                    <p class="text-muted-foreground">${post.excerpt}</p>
                    <div class="flex items-center space-x-4">
                        <div class="h-8 w-8 rounded-full bg-muted"></div>
                        <div>
                            <p class="text-sm font-medium">${post.author.name}</p>
                            <p class="text-sm text-muted-foreground">${post.author.date} · ${post.author.readTime}</p>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');

        section.innerHTML = `
            <div class="max-w-7xl mx-auto">
                <div class="mb-12">
                    <h4 class="text-sm font-semibold text-primary mb-4">Blog</h4>
                    <h2 class="text-3xl font-bold mb-4">Latest Insights and Updates</h2>
                    <p class="text-muted-foreground">Discover our recent projects and their impact on communities.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">${postsHtml}</div>
                <div class="flex justify-end">
                    <button class="text-primary hover:text-primary/80">View all</button>
                </div>
            </div>
        `;
        return section;
    }

    function createFooter() {
        const footer = document.createElement('footer');
        footer.className = 'w-full py-16 px-4 border-t';
        footer.innerHTML = `
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div class="space-y-4">
                        <div class="font-bold text-xl">Logo</div>
                        <div class="space-y-2">
                            <p class="text-sm text-muted-foreground">Address:</p>
                            <p class="text-sm">Level 1, 12 Sample St, Sydney NSW 2000</p>
                        </div>
                        <div class="space-y-2">
                            <p class="text-sm text-muted-foreground">Contact:</p>
                            <p class="text-sm">1800 123 456</p>
                            <p class="text-sm">hello@nonprofit.org</p>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <h3 class="font-semibold">Get Involved</h3>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-sm hover:text-primary">Our Impact</a></li>
                            <li><a href="#" class="text-sm hover:text-primary">Donate Now</a></li>
                            <li><a href="#" class="text-sm hover:text-primary">Volunteer With Us</a></li>
                            <li><a href="#" class="text-sm hover:text-primary">Events Calendar</a></li>
                        </ul>
                    </div>
                    <div class="space-y-4">
                        <h3 class="font-semibold">Success Stories</h3>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-sm hover:text-primary">Join Us</a></li>
                            <li><a href="#" class="text-sm hover:text-primary">News Updates</a></li>
                            <li><a href="#" class="text-sm hover:text-primary">Contact Us</a></li>
                            <li><a href="#" class="text-sm hover:text-primary">FAQs</a></li>
                        </ul>
                    </div>
                    <div class="space-y-4">
                        <div class="flex space-x-4">
                            <a href="#" class="text-muted-foreground hover:text-primary"><i data-lucide="facebook" width="20" height="20"></i></a>
                            <a href="#" class="text-muted-foreground hover:text-primary"><i data-lucide="instagram" width="20" height="20"></i></a>
                            <a href="#" class="text-muted-foreground hover:text-primary"><i data-lucide="twitter" width="20" height="20"></i></a>
                            <a href="#" class="text-muted-foreground hover:text-primary"><i data-lucide="youtube" width="20" height="20"></i></a>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
                    <p class="text-sm text-muted-foreground">© 2023 Nonprofit Agency. All rights reserved.</p>
                    <div class="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" class="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a>
                        <a href="#" class="text-sm text-muted-foreground hover:text-primary">Terms of Service</a>
                        <a href="#" class="text-sm text-muted-foreground hover:text-primary">Cookie Settings</a>
                    </div>
                </div>
            </div>
        `;
        return footer;
    }

    function renderComponentPreview() {
        const container = document.createElement('div');
        container.className = 'min-h-screen bg-background';

        container.appendChild(createTimeline(timelineItems));
        container.appendChild(createImpactSection());
        container.appendChild(createBlogSection());
        container.appendChild(createFooter());

        root.appendChild(container);
        lucide.createIcons();
    }

    renderComponentPreview();
});