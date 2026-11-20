"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AKTIVITAS_LIST,
  CALENDAR_EVENTS,
  CATEGORIES,
  POSTS,
  SERVICE_LINKS,
} from "@/data/mock-portal";
import {
  BERITA_DOSEN_LIST,
  DOSEN_LIST,
  PRODI_LIST,
} from "@/data/mock-dosen";
import {
  AktivitasItem,
  CalendarEvent,
  Category,
  Post,
  ServiceLink,
} from "@/types/portal";
import { BeritaDosen, Dosen, Prodi } from "@/types/dosen";

interface AdminState {
  posts: Post[];
  calendarEvents: CalendarEvent[];
  aktivitas: AktivitasItem[];
  categories: Category[];
  serviceLinks: ServiceLink[];
  dosenList: Dosen[];
  beritaDosen: BeritaDosen[];
  prodiList: Prodi[];
}

interface AdminContextValue extends AdminState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  upsertPost: (post: Post) => void;
  deletePost: (id: string) => void;
  upsertCalendarEvent: (event: CalendarEvent) => void;
  deleteCalendarEvent: (id: string) => void;
  upsertAktivitas: (item: AktivitasItem) => void;
  deleteAktivitas: (id: string) => void;
  upsertCategory: (cat: Category) => void;
  upsertServiceLink: (link: ServiceLink) => void;
  upsertDosen: (dosen: Dosen) => void;
  deleteDosen: (id: string) => void;
  upsertBeritaDosen: (berita: BeritaDosen) => void;
  deleteBeritaDosen: (id: string) => void;
  resetDemoData: () => void;
}

const STORAGE_KEY = "uisb_admin_data_v2";
const AUTH_KEY = "uisb_super_admin_auth";

const INITIAL_STATE: AdminState = {
  posts: POSTS,
  calendarEvents: CALENDAR_EVENTS,
  aktivitas: AKTIVITAS_LIST,
  categories: CATEGORIES,
  serviceLinks: SERVICE_LINKS,
  dosenList: DOSEN_LIST,
  beritaDosen: BERITA_DOSEN_LIST,
  prodiList: PRODI_LIST,
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdminState>(INITIAL_STATE);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setState(JSON.parse(saved) as AdminState);
      }
      const auth = localStorage.getItem(AUTH_KEY);
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    } catch {
      // Ignore storage errors
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state, hydrated]);

  const login = (email: string, password: string) => {
    if (
      email.trim().toLowerCase() === "admin@uisb.ac.id" &&
      password === "uisb2026"
    ) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem(AUTH_KEY, "true");
      } catch {
        // Ignore
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
      // Ignore
    }
  };

  const upsertPost = (post: Post) => {
    setState((prev) => {
      const exists = prev.posts.some((p) => p.id === post.id);
      return {
        ...prev,
        posts: exists
          ? prev.posts.map((p) => (p.id === post.id ? post : p))
          : [post, ...prev.posts],
      };
    });
  };

  const deletePost = (id: string) => {
    setState((prev) => ({
      ...prev,
      posts: prev.posts.filter((p) => p.id !== id),
    }));
  };

  const upsertCalendarEvent = (event: CalendarEvent) => {
    setState((prev) => {
      const exists = prev.calendarEvents.some((e) => e.id === event.id);
      return {
        ...prev,
        calendarEvents: exists
          ? prev.calendarEvents.map((e) => (e.id === event.id ? event : e))
          : [event, ...prev.calendarEvents],
      };
    });
  };

  const deleteCalendarEvent = (id: string) => {
    setState((prev) => ({
      ...prev,
      calendarEvents: prev.calendarEvents.filter((e) => e.id !== id),
    }));
  };

  const upsertAktivitas = (item: AktivitasItem) => {
    setState((prev) => {
      const exists = prev.aktivitas.some((a) => a.id === item.id);
      return {
        ...prev,
        aktivitas: exists
          ? prev.aktivitas.map((a) => (a.id === item.id ? item : a))
          : [item, ...prev.aktivitas],
      };
    });
  };

  const deleteAktivitas = (id: string) => {
    setState((prev) => ({
      ...prev,
      aktivitas: prev.aktivitas.filter((a) => a.id !== id),
    }));
  };

  const upsertCategory = (cat: Category) => {
    setState((prev) => {
      const exists = prev.categories.some((c) => c.id === cat.id);
      return {
        ...prev,
        categories: exists
          ? prev.categories.map((c) => (c.id === cat.id ? cat : c))
          : [...prev.categories, cat],
      };
    });
  };

  const upsertServiceLink = (link: ServiceLink) => {
    setState((prev) => {
      const exists = prev.serviceLinks.some((l) => l.id === link.id);
      return {
        ...prev,
        serviceLinks: exists
          ? prev.serviceLinks.map((l) => (l.id === link.id ? link : l))
          : [...prev.serviceLinks, link],
      };
    });
  };

  const upsertDosen = (dosen: Dosen) => {
    setState((prev) => {
      const exists = prev.dosenList.some((d) => d.id === dosen.id);
      return {
        ...prev,
        dosenList: exists
          ? prev.dosenList.map((d) => (d.id === dosen.id ? dosen : d))
          : [dosen, ...prev.dosenList],
      };
    });
  };

  const deleteDosen = (id: string) => {
    setState((prev) => ({
      ...prev,
      dosenList: prev.dosenList.filter((d) => d.id !== id),
    }));
  };

  const upsertBeritaDosen = (berita: BeritaDosen) => {
    setState((prev) => {
      const exists = prev.beritaDosen.some((b) => b.id === berita.id);
      return {
        ...prev,
        beritaDosen: exists
          ? prev.beritaDosen.map((b) => (b.id === berita.id ? berita : b))
          : [berita, ...prev.beritaDosen],
      };
    });
  };

  const deleteBeritaDosen = (id: string) => {
    setState((prev) => ({
      ...prev,
      beritaDosen: prev.beritaDosen.filter((b) => b.id !== id),
    }));
  };

  const resetDemoData = () => {
    setState(INITIAL_STATE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <AdminContext.Provider
      value={{
        ...state,
        isAuthenticated,
        login,
        logout,
        upsertPost,
        deletePost,
        upsertCalendarEvent,
        deleteCalendarEvent,
        upsertAktivitas,
        deleteAktivitas,
        upsertCategory,
        upsertServiceLink,
        upsertDosen,
        deleteDosen,
        upsertBeritaDosen,
        deleteBeritaDosen,
        resetDemoData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used inside AdminProvider");
  }
  return ctx;
}
