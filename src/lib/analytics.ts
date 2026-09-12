/**
 * E-commerce Analytics & KPI Tracking Engine
 * Tracks:
 * - Time on Page (active engagement time)
 * - Click-Through Rate (CTR) for key calls-to-action
 * - Conversion Rate (CR) through checkout completion funnel
 */

export interface AnalyticsEvent {
  name: string;
  category: 'interaction' | 'ecommerce' | 'engagement';
  payload?: Record<string, unknown>;
  timestamp: number;
}

export interface KPIMetrics {
  totalPageViews: number;
  totalEngagedSeconds: number;
  heroCtaClicks: number;
  totalAddToCartClicks: number;
  checkoutStarts: number;
  ordersCompleted: number;
  clickThroughRate: number; // (Total CTA Clicks / Page Views) * 100
  conversionRate: number;   // (Orders Completed / Page Views) * 100
  averageOrderValue: number;
}

const STORAGE_KEY = 'narango_ecommerce_kpis';

class AnalyticsService {
  private startTime: number = Date.now();
  private engagedSeconds: number = 0;
  private timerId: number | null = null;
  private isEngaged: boolean = true;

  constructor() {
    this.initSession();
    this.startEngagementTracking();
  }

  private getStoredMetrics(): KPIMetrics {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Fallback if storage blocked
    }
    return {
      totalPageViews: 0,
      totalEngagedSeconds: 0,
      heroCtaClicks: 0,
      totalAddToCartClicks: 0,
      checkoutStarts: 0,
      ordersCompleted: 0,
      clickThroughRate: 0,
      conversionRate: 0,
      averageOrderValue: 0,
    };
  }

  private saveMetrics(metrics: KPIMetrics) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
    } catch {
      // Ignore in private storage sandbox
    }
  }

  private initSession() {
    if (typeof window === 'undefined') return;

    const metrics = this.getStoredMetrics();
    metrics.totalPageViews += 1;
    this.recalculateRates(metrics);
    this.saveMetrics(metrics);

    // Track tab visibility changes
    document.addEventListener('visibilitychange', () => {
      this.isEngaged = !document.hidden;
    });
  }

  private startEngagementTracking() {
    if (typeof window === 'undefined') return;

    this.timerId = window.setInterval(() => {
      if (this.isEngaged) {
        this.engagedSeconds += 1;
        if (this.engagedSeconds % 5 === 0) {
          const metrics = this.getStoredMetrics();
          metrics.totalEngagedSeconds += 5;
          this.saveMetrics(metrics);
        }
      }
    }, 1000);
  }

  private recalculateRates(metrics: KPIMetrics) {
    const totalViews = Math.max(1, metrics.totalPageViews);
    const totalInteractions = metrics.heroCtaClicks + metrics.totalAddToCartClicks;
    
    // CTR Calculation
    metrics.clickThroughRate = Number(((totalInteractions / totalViews) * 100).toFixed(2));
    
    // Conversion Rate Calculation
    metrics.conversionRate = Number(((metrics.ordersCompleted / totalViews) * 100).toFixed(2));
  }

  public trackCtaClick(ctaName: string) {
    const metrics = this.getStoredMetrics();
    if (ctaName.startsWith('hero_')) {
      metrics.heroCtaClicks += 1;
    }
    this.recalculateRates(metrics);
    this.saveMetrics(metrics);

    this.dispatchCustomEvent('cta_click', { cta: ctaName });
  }

  public trackAddToCart(flavorId: string, price: number) {
    const metrics = this.getStoredMetrics();
    metrics.totalAddToCartClicks += 1;
    this.recalculateRates(metrics);
    this.saveMetrics(metrics);

    this.dispatchCustomEvent('add_to_cart', { flavorId, price });
  }

  public trackCheckoutStart(itemCount: number, subtotal: number) {
    const metrics = this.getStoredMetrics();
    metrics.checkoutStarts += 1;
    this.recalculateRates(metrics);
    this.saveMetrics(metrics);

    this.dispatchCustomEvent('begin_checkout', { itemCount, subtotal });
  }

  public trackPurchaseCompleted(orderId: string, orderTotal: number, itemCount: number) {
    const metrics = this.getStoredMetrics();
    metrics.ordersCompleted += 1;
    const previousTotalRevenue = metrics.averageOrderValue * Math.max(0, metrics.ordersCompleted - 1);
    metrics.averageOrderValue = Number(((previousTotalRevenue + orderTotal) / metrics.ordersCompleted).toFixed(2));
    this.recalculateRates(metrics);
    this.saveMetrics(metrics);

    this.dispatchCustomEvent('purchase', { orderId, orderTotal, itemCount });
  }

  public getKPISummary(): KPIMetrics & { currentSessionSeconds: number } {
    const metrics = this.getStoredMetrics();
    return {
      ...metrics,
      currentSessionSeconds: this.engagedSeconds,
    };
  }

  private dispatchCustomEvent(name: string, payload: Record<string, unknown>) {
    if (typeof window === 'undefined') return;
    try {
      const event = new CustomEvent('narango_analytics', {
        detail: {
          name,
          payload,
          timestamp: Date.now(),
        },
      });
      window.dispatchEvent(event);
    } catch {
      // In case CustomEvent unsupported
    }
  }

  public cleanup() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}

export const analytics = new AnalyticsService();
