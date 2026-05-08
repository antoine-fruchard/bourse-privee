"use client";

import { useState } from "react";
import { Bell, Mail, MessageCircle, Plus, Trash2, Check, TrendingUp, TrendingDown, ChevronDown, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TickerLogo } from "@/components/ui/ticker-logo";

type AlertType = "target-up" | "target-down" | "reco" | "earnings";
type AlertChannel = "email" | "whatsapp" | "both";
type AlertStatus = "active" | "triggered" | "paused";

type StockAlert = {
  id: string;
  ticker: string;
  name: string;
  type: AlertType;
  threshold?: number;
  currentPrice: number;
  channel: AlertChannel;
  status: AlertStatus;
  triggeredAt?: string;
  note?: string;
};

const INITIAL_ALERTS: StockAlert[] = [
  {
    id: "1",
    ticker: "NVDA",
    name: "Nvidia",
    type: "target-up",
    threshold: 200,
    currentPrice: 178.2,
    channel: "both",
    status: "active",
    note: "Objectif HelloBroker atteint → renforcer ou sécuriser",
  },
  {
    id: "2",
    ticker: "AAPL",
    name: "Apple",
    type: "target-down",
    threshold: 175,
    currentPrice: 189.3,
    channel: "whatsapp",
    status: "active",
    note: "Stop-loss — vendre si cassure",
  },
  {
    id: "3",
    ticker: "TSLA",
    name: "Tesla",
    type: "earnings",
    currentPrice: 248.5,
    channel: "email",
    status: "active",
    note: "Résultats Q2 2026 — 23 juillet",
  },
  {
    id: "4",
    ticker: "META",
    name: "Meta Platforms",
    type: "target-up",
    threshold: 700,
    currentPrice: 612.8,
    channel: "both",
    status: "triggered",
    triggeredAt: "2026-05-01",
    note: "Alerte déclenchée · +14.3% depuis le signal",
  },
  {
    id: "5",
    ticker: "MSFT",
    name: "Microsoft",
    type: "reco",
    currentPrice: 482.3,
    channel: "email",
    status: "active",
    note: "Nouvelle recommandation HelloBroker",
  },
];

const ALERT_TYPE_LABELS: Record<AlertType, string> = {
  "target-up": "Seuil haussier",
  "target-down": "Seuil baissier",
  "reco": "Nouvelle reco",
  "earnings": "Publication résultats",
};

const CHANNEL_LABELS: Record<AlertChannel, string> = {
  email: "Email",
  whatsapp: "WhatsApp",
  both: "Email + WA",
};

export default function AlertesPage() {
  const [alerts, setAlerts] = useState<StockAlert[]>(INITIAL_ALERTS);
  const [showForm, setShowForm] = useState(false);
  const [newTicker, setNewTicker] = useState("AAPL");
  const [newType, setNewType] = useState<AlertType>("target-up");
  const [newThreshold, setNewThreshold] = useState("");
  const [newChannel, setNewChannel] = useState<AlertChannel>("both");
  const [newNote, setNewNote] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [waEnabled, setWaEnabled] = useState(true);
  const [emailAddress] = useState("guillaume.gozlan@gmail.com");
  const [waNumber] = useState("+33 6 12 34 56 78");

  const active = alerts.filter((a) => a.status === "active");
  const triggered = alerts.filter((a) => a.status === "triggered");

  function removeAlert(id: string) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  function togglePause(id: string) {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "active" ? "paused" : "active" } : a
      )
    );
  }

  function addAlert() {
    if (!newTicker) return;
    const prices: Record<string, number> = { AAPL: 189.3, MSFT: 482.3, NVDA: 178.2, META: 612.8, GOOGL: 172.8, AMZN: 186.4, TSLA: 248.5, JPM: 244.2, V: 280.1, COST: 912.4, ORCL: 166.8, UNH: 544.3 };
    const names: Record<string, string> = { AAPL: "Apple", MSFT: "Microsoft", NVDA: "Nvidia", META: "Meta", GOOGL: "Alphabet", AMZN: "Amazon", TSLA: "Tesla", JPM: "JPMorgan", V: "Visa", COST: "Costco", ORCL: "Oracle", UNH: "UnitedHealth" };
    setAlerts((prev) => [
      {
        id: Date.now().toString(),
        ticker: newTicker.toUpperCase(),
        name: names[newTicker.toUpperCase()] ?? newTicker,
        type: newType,
        threshold: newThreshold ? Number(newThreshold) : undefined,
        currentPrice: prices[newTicker.toUpperCase()] ?? 100,
        channel: newChannel,
        status: "active",
        note: newNote || undefined,
      },
      ...prev,
    ]);
    setShowForm(false);
    setNewTicker("AAPL");
    setNewThreshold("");
    setNewNote("");
  }

  return (
    <>
      <PageHero
        eyebrow="Mes alertes"
        title="Soyez alerté en temps réel"
        description="Configurez vos seuils de prix, suivez les nouvelles recommandations et les publications de résultats. On vous notifie par email ou WhatsApp."
      />

      <section className="container-app py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-8">

            {/* Active alerts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-extrabold tracking-tight">
                  Alertes actives
                  <span className="ml-2 text-base font-bold text-[var(--violet-500)]">({active.length})</span>
                </h2>
                <Button size="sm" onClick={() => setShowForm(!showForm)}>
                  <Plus className="w-4 h-4 mr-1.5" />
                  Nouvelle alerte
                </Button>
              </div>

              {/* Add form */}
              {showForm && (
                <div className="mb-4 bg-white rounded-[var(--radius-lg)] border border-[var(--violet-200)] p-6 shadow-[var(--shadow-sm)]">
                  <p className="font-bold mb-4">Nouvelle alerte</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--gris-1)] mb-1.5">Ticker</label>
                      <select
                        value={newTicker}
                        onChange={(e) => setNewTicker(e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-[var(--gris-3)] text-sm font-semibold bg-white focus:outline-none focus:border-[var(--violet-500)]"
                      >
                        {["AAPL", "MSFT", "NVDA", "META", "GOOGL", "AMZN", "TSLA", "JPM", "V", "COST", "ORCL", "UNH"].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--gris-1)] mb-1.5">Type d&apos;alerte</label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as AlertType)}
                        className="w-full h-11 px-3 rounded-xl border border-[var(--gris-3)] text-sm font-semibold bg-white focus:outline-none focus:border-[var(--violet-500)]"
                      >
                        <option value="target-up">Seuil haussier</option>
                        <option value="target-down">Seuil baissier</option>
                        <option value="reco">Nouvelle recommandation</option>
                        <option value="earnings">Publication résultats</option>
                      </select>
                    </div>
                    {(newType === "target-up" || newType === "target-down") && (
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[var(--gris-1)] mb-1.5">Seuil ($)</label>
                        <input
                          type="number"
                          value={newThreshold}
                          onChange={(e) => setNewThreshold(e.target.value)}
                          placeholder="ex : 200"
                          className="w-full h-11 px-3 rounded-xl border border-[var(--gris-3)] text-sm font-semibold bg-white focus:outline-none focus:border-[var(--violet-500)]"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--gris-1)] mb-1.5">Canal</label>
                      <select
                        value={newChannel}
                        onChange={(e) => setNewChannel(e.target.value as AlertChannel)}
                        className="w-full h-11 px-3 rounded-xl border border-[var(--gris-3)] text-sm font-semibold bg-white focus:outline-none focus:border-[var(--violet-500)]"
                      >
                        <option value="both">Email + WhatsApp</option>
                        <option value="email">Email seulement</option>
                        <option value="whatsapp">WhatsApp seulement</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--gris-1)] mb-1.5">Note (optionnel)</label>
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="ex : Renforcer si atteint"
                        className="w-full h-11 px-3 rounded-xl border border-[var(--gris-3)] text-sm bg-white focus:outline-none focus:border-[var(--violet-500)]"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button size="md" onClick={addAlert}>
                      <Check className="w-4 h-4 mr-1.5" />
                      Créer l&apos;alerte
                    </Button>
                    <Button size="md" variant="outline" onClick={() => setShowForm(false)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {active.length === 0 && (
                  <div className="text-center py-12 text-[var(--gris-1)] text-sm">
                    Aucune alerte active. Cliquez sur &quot;Nouvelle alerte&quot; pour en créer une.
                  </div>
                )}
                {active.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} onRemove={removeAlert} onToggle={togglePause} />
                ))}
              </div>
            </div>

            {/* Triggered alerts */}
            {triggered.length > 0 && (
              <div>
                <h2 className="text-xl font-extrabold tracking-tight mb-4 text-[var(--gris-1)]">
                  Déclenchées récemment
                </h2>
                <div className="space-y-3 opacity-75">
                  {triggered.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} onRemove={removeAlert} onToggle={togglePause} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-5">

            {/* Notification preferences */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-[var(--violet-500)]" />
                <p className="font-bold">Canaux de notification</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-xl border border-[var(--gris-3)]">
                  <Mail className="w-5 h-5 text-[var(--violet-500)] mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">Email</p>
                    <p className="text-xs text-[var(--gris-1)] truncate">{emailAddress}</p>
                  </div>
                  <button
                    onClick={() => setEmailEnabled(!emailEnabled)}
                    className={`w-10 h-6 rounded-full transition-colors shrink-0 ${emailEnabled ? "bg-[var(--violet-500)]" : "bg-[var(--gris-3)]"}`}
                  >
                    <span className={`block w-4 h-4 rounded-full bg-white shadow transition-transform mx-1 ${emailEnabled ? "translate-x-4" : ""}`} />
                  </button>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl border border-[var(--gris-3)]">
                  <MessageCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">WhatsApp</p>
                    <p className="text-xs text-[var(--gris-1)]">{waNumber}</p>
                  </div>
                  <button
                    onClick={() => setWaEnabled(!waEnabled)}
                    className={`w-10 h-6 rounded-full transition-colors shrink-0 ${waEnabled ? "bg-emerald-500" : "bg-[var(--gris-3)]"}`}
                  >
                    <span className={`block w-4 h-4 rounded-full bg-white shadow transition-transform mx-1 ${waEnabled ? "translate-x-4" : ""}`} />
                  </button>
                </div>
              </div>

              <p className="mt-4 text-xs text-[var(--gris-1)] leading-relaxed">
                Les alertes email arrivent instantanément. WhatsApp peut prendre 1–2 minutes selon la couverture réseau.
              </p>
            </div>

            {/* Recent notifications */}
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6">
              <p className="font-bold mb-4">Historique des notifications</p>
              <div className="space-y-3">
                {[
                  { ticker: "META", msg: "Seuil $700 atteint · +14.3%", time: "Il y a 6j", icon: "✅", color: "text-emerald-700" },
                  { ticker: "NVDA", msg: "Résultats Q1 solides publiés", time: "Il y a 8j", icon: "📊", color: "text-[var(--violet-500)]" },
                  { ticker: "AAPL", msg: "Nouvelle reco HelloBroker", time: "Il y a 12j", icon: "⭐", color: "text-[var(--orange-500)]" },
                  { ticker: "TSLA", msg: "Seuil $220 atteint · signal achat", time: "Il y a 18j", icon: "✅", color: "text-emerald-700" },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-base leading-tight">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">
                        <span className="text-[var(--violet-500)]">{n.ticker}</span>{" "}
                        <span className={n.color}>{n.msg}</span>
                      </p>
                      <p className="text-xs text-[var(--gris-1)]">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-[var(--radius-lg)] gradient-violet text-white p-6">
              <Sparkles className="w-6 h-6" />
              <p className="mt-3 font-extrabold text-lg">Alertes automatiques IA</p>
              <p className="mt-1 text-white/85 text-sm leading-relaxed">
                HelloBroker analyse les earnings, révisions d&apos;analystes et flux institutionnels pour vous envoyer des alertes avant les mouvements.
              </p>
              <button className="mt-4 w-full h-10 rounded-full bg-white text-[var(--violet-700)] text-sm font-bold hover:bg-white/90 transition-colors">
                Activer les alertes IA
              </button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function AlertCard({
  alert,
  onRemove,
  onToggle,
}: {
  alert: StockAlert;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  const isThreshold = alert.type === "target-up" || alert.type === "target-down";
  const distance = isThreshold && alert.threshold ? distancePct(alert.currentPrice, alert.threshold) : null;
  const isTriggered = alert.status === "triggered";

  const channelIcon = alert.channel === "email" ? "📧" : alert.channel === "whatsapp" ? "💬" : "📧💬";

  return (
    <div
      className={`bg-white rounded-[var(--radius-lg)] border p-5 transition-all ${
        isTriggered
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-[var(--gris-3)] hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-sm)]"
      }`}
    >
      <div className="flex items-start gap-4">
        <TickerLogo ticker={alert.ticker} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold">{alert.ticker}</span>
            <span className="text-[var(--gris-1)] text-sm font-medium">{alert.name}</span>
            <Badge tone={isTriggered ? "green" : "violet"}>
              {isTriggered ? "✓ Déclenchée" : ALERT_TYPE_LABELS[alert.type]}
            </Badge>
            <span className="text-xs text-[var(--gris-1)]">{channelIcon} {CHANNEL_LABELS[alert.channel]}</span>
          </div>

          <div className="mt-2 flex items-center gap-4 flex-wrap">
            {isThreshold && alert.threshold && (
              <div className="flex items-center gap-1.5">
                {alert.type === "target-up" ? (
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className="text-sm font-bold tabular-nums">
                  Seuil : ${alert.threshold.toFixed(2)}
                </span>
                <span className="text-xs text-[var(--gris-1)] tabular-nums">
                  (cours actuel ${alert.currentPrice.toFixed(2)})
                </span>
                {distance !== null && !isTriggered && (
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      Math.abs(distance) < 5 ? "text-orange-600" : "text-[var(--gris-1)]"
                    }`}
                  >
                    {distance > 0 ? "+" : ""}{distance.toFixed(1)}% restant
                  </span>
                )}
              </div>
            )}
            {isTriggered && alert.triggeredAt && (
              <span className="text-xs text-emerald-700 font-semibold">
                Déclenchée le {new Date(alert.triggeredAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
              </span>
            )}
          </div>

          {alert.note && (
            <p className="mt-1.5 text-xs text-[var(--gris-1)] leading-relaxed">{alert.note}</p>
          )}

          {/* Progress bar for threshold alerts */}
          {isThreshold && alert.threshold && !isTriggered && (
            <div className="mt-3 h-1.5 rounded-full bg-[var(--gris-4)] overflow-hidden w-48">
              <div
                className={`h-full rounded-full transition-all ${
                  alert.type === "target-up" ? "bg-emerald-500" : "bg-red-500"
                }`}
                style={{
                  width: `${Math.min(100, Math.max(0, alert.type === "target-up"
                    ? (alert.currentPrice / alert.threshold) * 100
                    : (alert.threshold / alert.currentPrice) * 100
                  ))}%`,
                }}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isTriggered && (
            <button
              onClick={() => onToggle(alert.id)}
              className="w-8 h-8 rounded-full hover:bg-[var(--gris-4)] grid place-items-center text-[var(--gris-1)] transition-colors"
              title="Mettre en pause"
            >
              <Bell className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onRemove(alert.id)}
            className="w-8 h-8 rounded-full hover:bg-red-50 hover:text-red-600 grid place-items-center text-[var(--gris-1)] transition-colors"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function distancePct(current: number, threshold: number) {
  return ((threshold - current) / current) * 100;
}
