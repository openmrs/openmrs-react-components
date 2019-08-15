/**
 * Based on the fr.js locale file
 * TODO: update with Kreyol-specific wording
 */
!(function(e, a) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = a())
    : "function" == typeof define && define.amd
    ? define(a)
    : ((e.ReactIntlLocaleData = e.ReactIntlLocaleData || {}),
      (e.ReactIntlLocaleData.fr = a()));
})(this, function() {
  "use strict";
  return [
    {
      locale: "ht",
      pluralRuleFunction: function(e, a) {
        return a
          ? 1 == e
            ? "one"
            : "other"
          : e >= 0 && e < 2
          ? "one"
          : "other";
      },
      fields: {
        year: {
          displayName: "année",
          relative: {
            0: "cette année",
            1: "l’année prochaine",
            "-1": "l’année dernière"
          },
          relativeTime: {
            future: { one: "dans {0} an", other: "dans {0} ans" },
            past: { one: "il y a {0} an", other: "il y a {0} ans" }
          }
        },
        month: {
          displayName: "mois",
          relative: {
            0: "ce mois-ci",
            1: "le mois prochain",
            "-1": "le mois dernier"
          },
          relativeTime: {
            future: { one: "dans {0} mois", other: "dans {0} mois" },
            past: { one: "il y a {0} mois", other: "il y a {0} mois" }
          }
        },
        day: {
          displayName: "jour",
          relative: {
            0: "aujourd’hui",
            1: "demain",
            2: "après-demain",
            "-2": "avant-hier",
            "-1": "hier"
          },
          relativeTime: {
            future: { one: "dans {0} jour", other: "dans {0} jours" },
            past: { one: "il y a {0} jour", other: "il y a {0} jours" }
          }
        },
        hour: {
          displayName: "heure",
          relative: { 0: "cette heure-ci" },
          relativeTime: {
            future: { one: "dans {0} heure", other: "dans {0} heures" },
            past: { one: "il y a {0} heure", other: "il y a {0} heures" }
          }
        },
        minute: {
          displayName: "minute",
          relative: { 0: "cette minute-ci" },
          relativeTime: {
            future: { one: "dans {0} minute", other: "dans {0} minutes" },
            past: { one: "il y a {0} minute", other: "il y a {0} minutes" }
          }
        },
        second: {
          displayName: "seconde",
          relative: { 0: "maintenant" },
          relativeTime: {
            future: { one: "dans {0} seconde", other: "dans {0} secondes" },
            past: { one: "il y a {0} seconde", other: "il y a {0} secondes" }
          }
        }
      }
    },
  ];
});
