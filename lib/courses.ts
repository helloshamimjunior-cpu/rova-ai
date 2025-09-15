// lib/courses.ts
export type Lesson = {
  id: string;
  title: string;
  duration: string;
  free?: boolean;              // ফ্রি ডেমো লেসন?
  video?: string;              // ভিডিও সোর্স URL (mp4 / m3u8 / etc.)
};

export type Module = { title: string; lessons: Lesson[] };

export type Course = {
  slug: 'basic' | 'intermediate' | 'advanced' | 'micro';
  level: 'Basic' | 'Intermediate' | 'Advanced' | 'Micro';
  title: string;
  short: string;
  tagline: string;

  stats?: { rating: number; students: string; duration: string; lessons: number };

  price?: string;
  includes?: string[];
  forWho?: string[];
  prereqs?: string[];
  outcomes?: string[];
  syllabus?: Module[];
};

export const COURSES: Course[] = [
  {
    slug: 'basic',
    level: 'Basic',
    title: 'বেসিক এআই ফাউন্ডেশন',
    short: 'শুরু থেকে এআই ব্যবহার।',
    tagline: 'প্রম্পটিং, টুলস, দৈনন্দিন কাজে এআই—জিরো টু স্টার্ট।',
    stats: { rating: 4.8, students: '1.6k+', duration: '5h 10m', lessons: 16 },
    price: '৳ 3,990',
    includes: ['৫+ ঘন্টা ভিডিও', '১৬টি লেসন', 'ডাউনলোডেবল রিসোর্স', 'কমিউনিটি সাপোর্ট', 'সার্টিফিকেট'],
    forWho: ['শুরু করছেন এমন শিক্ষার্থী', 'পেশাজীবী যারা কাজ গতি চান', 'ছোট টিম/ফ্রিল্যান্সার'],
    prereqs: ['ইন্টারনেটসহ কম্পিউটার/মোবাইল', 'বেসিক ইংরেজি পড়া বোঝা', 'গুগল অ্যাকাউন্ট (Docs/Sheets)'],
    outcomes: ['সঠিক প্রম্পটিং', 'Docs/Sheets-এ এআই', 'দ্রুত রিপোর্ট/সারমারি', 'দৈনন্দিন ওয়ার্কফ্লোতে এআই'],
    syllabus: [
      {
        title: 'শুরু করা',
        lessons: [
          {
            id: 'b1',
            title: 'এআই কী ও কোথায় লাগে',
            duration: '07:20',
            free: true,
            video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          },
          {
            id: 'b2',
            title: 'প্রম্পটিং বেসিক',
            duration: '12:10',
            free: true,
            video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          },
          { id: 'b3', title: 'সেফটি ও বেস্ট প্র্যাকটিস', duration: '08:05' },
        ],
      },
      {
        title: 'হ্যান্ডস-অন',
        lessons: [
          { id: 'b4', title: 'Docs/Sheets ওয়ার্কফ্লো', duration: '11:35' },
          { id: 'b5', title: 'মিনি প্রজেক্ট: রিপোর্ট জেন', duration: '14:00' },
        ],
      },
    ],
  },
  {
    slug: 'intermediate',
    level: 'Intermediate',
    title: 'ইন্টারমিডিয়েট অটোমেশন',
    short: 'নো-কোড/লো-কোড অটোমেশন।',
    tagline: 'Zapier/Make, API বেসিক, ডেটা ওয়ার্কফ্লো—কাজে গতি।',
    stats: { rating: 4.7, students: '980+', duration: '6h 45m', lessons: 22 },
    price: '৳ 4,990',
    includes: ['৬+ ঘন্টা ভিডিও', '২২টি লেসন', 'টেমপ্লেট প্যাক', 'কমিউনিটি সাপোর্ট', 'সার্টিফিকেট'],
    forWho: ['অপারেশন্স/মার্কেটিং টিম', 'সলো ফাউন্ডার', 'ফ্রিল্যান্সার/এজেন্সি'],
    prereqs: ['বেসিক কম্পিউটার স্কিল', 'ইমেইল/ওয়েব অ্যাপ ব্যবহারের অভ্যাস'],
    outcomes: ['Zapier/Make অটোমেশন', 'API/ওয়েবহুক বেসিক', 'ডেটা ক্লিনিং', 'টেমপ্লেটিং/রিপোর্টিং'],
    syllabus: [
      {
        title: 'অটোমেশন ১০১',
        lessons: [
          {
            id: 'i1',
            title: 'Zapier: ট্রিগার → অ্যাকশন',
            duration: '10:22',
            free: true,
            video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          },
          { id: 'i2', title: 'Make: সিচুয়েশন বিল্ডিং', duration: '13:05' },
        ],
      },
      {
        title: 'ডেটা ও API',
        lessons: [
          { id: 'i3', title: 'API ধারণা, অথ, রেট লিমিট', duration: '12:40' },
          { id: 'i4', title: 'ওয়েবহুক ইন্টেগ্রেশন', duration: '09:30' },
        ],
      },
    ],
  },
  {
    slug: 'advanced',
    level: 'Advanced',
    title: 'অ্যাডভান্সড এআই অ্যাপস',
    short: 'RAG, এজেন্টস, ইভ্যালুয়েশন।',
    tagline: 'প্রটোটাইপ থেকে ব্যবহারযোগ্য অ্যাপ—হ্যান্ডস-অন প্রজেক্ট।',
    stats: { rating: 4.9, students: '720+', duration: '8h 30m', lessons: 26 },
    price: '৳ 6,490',
    includes: ['৮+ ঘন্টা ভিডিও', '২৬টি লেসন', 'কোড টেমপ্লেট', 'ইভ্যালুয়েশন টুলকিট', 'সার্টিফিকেট'],
    forWho: ['ডেভেলপার', 'টেকনিক্যাল টিম', 'টেক-লিড/সোলিউশন আর্কিটেক্ট'],
    prereqs: ['জাভাস্ক্রিপ্ট/পাইথনের বেসিক', 'API/JSON বুঝি', 'গিট/টার্মিনাল বেসিক'],
    outcomes: ['RAG পাইপলাইন', 'ভেক্টর সার্চ/রি-র্যাঙ্কিং', 'ইভ্যালু/অবজারভেবিলিটি', 'এজেন্টিক প্যাটার্ন'],
    syllabus: [
      {
        title: 'RAG ভিত্তি',
        lessons: [
          {
            id: 'a1',
            title: 'ইনজেশন ও চাঙ্কিং',
            duration: '11:12',
            free: true,
            video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          },
          { id: 'a2', title: 'হাইব্রিড সার্চ/রি-র্যাঙ্ক', duration: '15:21' },
        ],
      },
      {
        title: 'এজেন্টস ও ইভ্যালু',
        lessons: [
          { id: 'a3', title: 'টুল ইন্টেগ্রেশন', duration: '12:07' },
          { id: 'a4', title: 'ইভ্যালু টেস্টবেড', duration: '16:45' },
        ],
      },
    ],
  },
  {
    slug: 'micro',
    level: 'Micro',
    title: 'মাইক্রো লার্নিং প্যাক',
    short: '১০–১৫ মিনিটের বাইট-সাইজড লেসন।',
    tagline: 'দ্রুত শেখা, দ্রুত প্রয়োগ—টপিক-ওয়াইজ মিনি সেশন।',
    stats: { rating: 4.6, students: '2.1k+', duration: '3h 00m', lessons: 28 },
    price: '৳ 1,990',
    includes: ['৩+ ঘন্টা ভিডিও', '২৮টি মাইক্রো লেসন', 'কুইজ/চেকলিস্ট', 'কমিউনিটি ডিসকাশন'],
    forWho: ['ব্যস্ত প্রফেশনাল', 'দ্রুত আপস্কিল দরকার', 'শর্ট-ফর্ম কনটেন্ট পছন্দ'],
    prereqs: ['শুধু ইন্টারনেট কানেকশন'],
    outcomes: ['কুইক টিপস', 'তাৎক্ষণিক প্রয়োগ', 'ওয়ার্কফ্লো অপ্টিমাইজ'],
    syllabus: [
      {
        title: 'দ্রুত টিপস',
        lessons: [
          {
            id: 'm1',
            title: 'прম্পট কুইক ফিক্স',
            duration: '04:09',
            free: true,
            video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          },
          { id: 'm2', title: 'ডেটা ক্লিনিং ৫-মিনিট', duration: '05:41' },
          { id: 'm3', title: 'ইমেইল অটো-রেসপন্ডার', duration: '06:12' },
        ],
      },
    ],
  },
];

export function getCourseBySlug(slug: string) {
  return COURSES.find((c) => c.slug === slug);
}

// লিস্টিং সার্চ/ফিল্টার
export function searchCourses(level?: string, q?: string) {
  let list = [...COURSES];
  if (level && level !== 'All') list = list.filter(c => c.level.toLowerCase() === level.toLowerCase());
  if (q && q.trim()) {
    const s = q.toLowerCase();
    list = list.filter(
      c =>
        c.title.toLowerCase().includes(s) ||
        c.short.toLowerCase().includes(s) ||
        c.tagline.toLowerCase().includes(s)
    );
  }
  return list;
}
