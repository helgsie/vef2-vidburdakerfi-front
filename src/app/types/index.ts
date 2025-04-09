export interface EventData {
    id: number;
    eventId: string;
    titleIs: string;
    titleEn: string;
    textIs: string;
    textEn: string;
    language: {
      is: {
        title: string;
        text: string;
        place: string;
        tags: string[];
      },
      en: {
        title: string;
        text: string;
        place: string;
        tags: string[];
      }
    };
    event_image: string;
    thumbnail_image: string;
    accepted: boolean;
    active: boolean;
    end: string;
    event: boolean;
    randomImage?: string;
    image: {
      time: number;
      path: string;
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      original: string;
      image_id: string;
    },
    legacy: boolean;
    formattedAddress: string;
    city: string;
    location: [number, number];
    occurrence: string;
    owner: number;
    postal: string;
    start: string;
    street: string;
    template: boolean;
    dates: string[];
    tags: string[];
    media: {
      website: string | null;
      facebook: string | null;
      tickets: string | null;
    },
    event_id: string;
    _id: string;
    linked_service: string;
  }