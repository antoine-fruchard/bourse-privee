"use client";

import { useState } from "react";
import {
  PieChart as RPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sectorAlloc = [
  { name: "Technologie", value: 38, color: "#563BFF" },
  { name: "Luxe", value: 14, color: "#FF7049" },
  { name: "Santé", value: 10, color: "#20C997" },
  { name: "Énergie", value: 12, color: "#0066CC" },
  { name: "Banques", value: 8, color: "#1E1863" },
  { name: "Industrie", value: 10, color: "#8E6BFF" },
  { name: "Cash", value: 8, color: "#8B95A7" },
];

const geoAlloc = [
  { name: "États-Unis", value: 52, color: "#0033A0" },
  { name: "Europe", value: 32, color: "#FFA500" },
  { name: "Asie", value: 10, color: "#E63946" },
  { name: "Cash", value: 6, color: "#8B95A7" },
];

const riskScore = [{ name: "Risque", value: 64, fill: "#FF7049" }];

export default function AnalysePortefeuille() {
  const [step, setStep] = useState<"input" | "result">("input");

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Analyses", href: "/analyses" },
          { label: "Analyse de portefeuille" },
        ]}
        eyebrow="Auditez votre allocation"
        title="L'analyse 360° de votre portefeuille."
        description="Importez votre composition (manuel, CSV ou broker connecté) et obtenez en 60 secondes un audit complet : risques, biais, sectorisation, recommandations."
      />

      <section className="container-app py-10">
        {step === "input" ? (
          <div className="grid gap-6 lg:grid-cols-12">
            <form className="lg:col-span-8 bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">Étape 1 / 3</p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight">Renseignez votre portefeuille</h2>
              <p className="mt-2 text-[var(--gris-1)]">
                Tout reste local et confidentiel : aucune donnée n&apos;est stockée par défaut.
              </p>

              <div className="mt-6 grid gap-3">
                {["Microsoft", "Nvidia", "L'Oréal", "TotalEnergies", "ETF MSCI World"].map((name, i) => (
                  <div key={name} className="flex gap-3">
                    <input
                      defaultValue={name}
                      className="flex-1 h-11 px-4 rounded-xl bg-[var(--gris-4)] border border-transparent focus:bg-white focus:border-[var(--violet-500)] focus:outline-none transition-colors"
                    />
                    <input
                      defaultValue={[15, 12, 10, 8, 22][i]}
                      className="w-24 h-11 px-4 rounded-xl bg-[var(--gris-4)] border border-transparent focus:bg-white focus:border-[var(--violet-500)] focus:outline-none transition-colors text-right tabular-nums"
                    />
                    <span className="grid place-items-center px-3 text-[var(--gris-1)] font-bold">%</span>
                  </div>
                ))}
                <button
                  type="button"
                  className="h-11 rounded-xl border border-dashed border-[var(--gris-3)] text-sm font-semibold text-[var(--gris-1)] hover:border-[var(--violet-500)] hover:text-[var(--violet-500)] transition-colors"
                >
                  + Ajouter une ligne
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <select className="h-11 px-4 rounded-xl bg-[var(--gris-4)] border border-transparent focus:bg-white focus:border-[var(--violet-500)] focus:outline-none transition-colors text-sm font-semibold">
                  <option>Profil de risque</option>
                  <option>Prudent</option>
                  <option>Équilibré</option>
                  <option>Dynamique</option>
                </select>
                <select className="h-11 px-4 rounded-xl bg-[var(--gris-4)] border border-transparent focus:bg-white focus:border-[var(--violet-500)] focus:outline-none transition-colors text-sm font-semibold">
                  <option>Horizon</option>
                  <option>1-3 ans</option>
                  <option>3-5 ans</option>
                  <option>5 ans +</option>
                </select>
              </div>

              <div className="mt-7 pt-6 border-t border-[var(--gris-3)] flex items-center justify-between">
                <p className="text-xs text-[var(--gris-1)]">Aucune donnée enregistrée. Analyse effectuée localement.</p>
                <Button onClick={() => setStep("result")} type="button" trailingIcon={<ArrowRight className="w-4 h-4" />}>
                  Lancer l&apos;analyse
                </Button>
              </div>
            </form>

            <aside className="lg:col-span-4 space-y-5">
              <div className="rounded-[var(--radius-xl)] gradient-violet text-white p-6">
                <Sparkles className="w-7 h-7" />
                <p className="mt-3 font-bold text-lg">Connectez votre broker</p>
                <p className="text-sm text-white/85 mt-1">
                  Bourse Direct, Saxo Bank, Trade Republic, Boursorama : connectez en lecture seule
                  pour une analyse à jour automatiquement.
                </p>
                <Button variant="secondary" size="sm" className="mt-4">
                  Connecter mon compte
                </Button>
              </div>
              <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6">
                <p className="font-bold">Ce que vous obtenez</p>
                <ul className="mt-3 space-y-2 text-sm text-[var(--gris-1)]">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--green-600)] mt-0.5" />
                    Sectorisation et géographie
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--green-600)] mt-0.5" />
                    Score de risque et stress tests
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--green-600)] mt-0.5" />
                    Lignes redondantes et biais
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--green-600)] mt-0.5" />
                    Recommandations chiffrées
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-5 bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">Score de risque</p>
                <div className="mt-2 flex items-center gap-6">
                  <div style={{ width: 160, height: 160 }}>
                    <ResponsiveContainer>
                      <RadialBarChart innerRadius="68%" outerRadius="100%" data={riskScore} startAngle={90} endAngle={-270}>
                        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                        <RadialBar background={{ fill: "#F4F6FA" }} dataKey="value" cornerRadius={20} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <p className="text-5xl font-extrabold tracking-tight tabular-nums">64<span className="text-2xl text-[var(--gris-1)]">/100</span></p>
                    <Badge tone="orange" className="mt-2">Risque modéré-élevé</Badge>
                    <p className="mt-3 text-sm text-[var(--gris-1)] max-w-[260px] leading-relaxed">
                      Votre allocation est dynamique avec une concentration tech élevée.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">Allocation sectorielle</p>
                <div style={{ width: "100%", height: 200 }}>
                  <ResponsiveContainer>
                    <RPieChart>
                      <Pie data={sectorAlloc} dataKey="value" innerRadius={56} outerRadius={88} paddingAngle={2}>
                        {sectorAlloc.map((s, i) => (
                          <Cell key={i} fill={s.color} stroke="white" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => `${v}%`} />
                    </RPieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                  {sectorAlloc.map((s) => (
                    <li key={s.name} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                      <span className="flex-1 truncate">{s.name}</span>
                      <span className="font-bold tabular-nums">{s.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-3 bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">Géographie</p>
                <ul className="mt-4 space-y-3">
                  {geoAlloc.map((g) => (
                    <li key={g.name}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">{g.name}</span>
                        <span className="font-bold tabular-nums">{g.value}%</span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-[var(--gris-4)] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${g.value}%`, background: g.color }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6">
              <h2 className="text-2xl font-extrabold tracking-tight">Recommandations prioritaires</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {[
                  { tone: "warning", title: "Concentration tech élevée (38%)", body: "Envisager une réduction de 5-10 pts pour limiter le drawdown en cas de cycle baissier sur l'IA." },
                  { tone: "success", title: "Bon équilibre EUR / USD", body: "Votre exposition 52/32 est dans la fourchette recommandée pour un horizon 5 ans." },
                  { tone: "warning", title: "Sous-exposition Asie", body: "10% est faible pour un portefeuille équilibré, considérer un ETF MSCI EM (5-8 pts)." },
                  { tone: "success", title: "Aucun double-emploi", body: "Pas de redondance détectée entre vos lignes individuelles et vos ETF." },
                ].map((r) => (
                  <div key={r.title} className={`rounded-[var(--radius-lg)] p-5 border ${r.tone === "warning" ? "border-[var(--orange-500)]/30 bg-[var(--orange-500)]/5" : "border-[var(--green-500)]/30 bg-[var(--green-500)]/5"}`}>
                    <div className="flex items-center gap-2">
                      {r.tone === "warning" ? (
                        <AlertTriangle className="w-4 h-4 text-[var(--orange-500)]" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-[var(--green-600)]" />
                      )}
                      <p className="font-bold">{r.title}</p>
                    </div>
                    <p className="mt-2 text-sm text-[var(--gris-1)] leading-relaxed">{r.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[var(--gris-3)] flex items-center justify-between">
                <p className="text-sm text-[var(--gris-1)] inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--violet-500)]" />
                  Analyse confidentielle, aucune donnée stockée.
                </p>
                <Button variant="outline" onClick={() => setStep("input")} type="button">
                  Modifier mon portefeuille
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
