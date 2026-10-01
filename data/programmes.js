// `title`/`blurb` show on the Programmes cards; `detailTitle`/`description` on /programmes/[id].

export const programmes = [
  {
    id: 'talks', alt: 'Talks', icon: 'talks',
    image:'https://github.com/shreshthasarraf/fest-images/blob/main/mainaudi.jpeg?raw=true',
    title: 'Main Auditorium',
    blurb: 'Speaker sessions and panel discussions bringing together diverse voices and perspectives.',
    detailTitle: 'Shridhar Shriram Auditorium',
    description: 'Keynotes and fireside chats from speakers across disciplines — policy, business, culture, science and the arts. Each session runs 30 to 45 minutes with time for audience questions, and the full day-wise line-up is announced closer to the festival.',
  },
  {
    id: 'stalls', alt: 'Stalls', icon: 'stalls',
    image:'https://github.com/shreshthasarraf/fest-images/blob/main/frontlawns.jpeg?raw=true',
    title: 'Front Lawns',
    blurb: 'Open-air conversations, community spaces and engaging experiences across the festival grounds.',
    detailTitle: 'Front Lawns',
    description: 'Student societies, publishers and partner brands set up along the avenue for all four days, with everything from books and merchandise to hands-on activities and tastings. A great way to explore the festival at your own pace between sessions.',
  },
  {
    id: 'competitions', alt: 'Competitions', icon: 'competitions',
    image:'https://github.com/shreshthasarraf/fest-images/blob/main/fiction_tent.jpeg?raw=true',
    title: 'House of Fiction',
    blurb: 'Performing arts competitions, creative showcases and fun and interactive games. A melting pot where ideas gets exchanged and creativity is celebrated.',
    detailTitle: 'House of fiction',
    description: 'Case studies, debates and creative challenges open to student teams, with real prizes and mentorship from industry judges. Registrations and rulebooks for each competition are shared ahead of the festival.',
  },
  {
    id: 'performances', alt: 'Performances', icon: 'rupee',
    image:'https://github.com/shreshthasarraf/fest-images/blob/main/front_lawn.png?raw=true',
    title: 'Business Zone',
    blurb: 'Conversations on startups, businesses, entrepreneurship and a Round Table Setup for networking and bring to life the ideas shaping the world of business.',
    detailTitle: 'Business Zone',
    description: 'Music, spoken word and dance from student groups and guest artists each evening, closing out the day on the main stage. Expect a mix of classical, contemporary and experimental acts across the four days.',
  },
  {
    id: 'books', alt: 'Books', icon: 'books',
    image:'https://github.com/shreshthasarraf/fest-images/blob/main/karighar.jpeg?raw=true',
    title: 'DU Bazaar',
    blurb: 'A vibrant marketplace of creative stalls, featuring independent makers, small organisations, jewellery, books and more',
    detailTitle: 'Karighar',
    description: 'A festival book fair with leading publishers, author signings and readings throughout the event. A dedicated space for browsing, discovering new titles and meeting writers in person.',
  },
];

export const findProgramme = (id) => programmes.find((p) => p.id === id);
