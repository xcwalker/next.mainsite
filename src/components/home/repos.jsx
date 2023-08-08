"use client";

import css from "@/styles/pages/home/repo.module.css";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { collection, getFirestore, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import { toTitleCase } from "@/functions/toTitleCase";

const db = getFirestore(firebase_app);

export function Home_Repos() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "repos"), orderBy("about.date", "desc"), limit(10));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setEntries((m) => {
          if (m.length === 0) {
            return [{ data: doc.data(), id: doc.id }];
          }
          if (m.some((d) => d.id === doc.id)) {
            var index = m.findIndex((d) => d.id === doc.id);
            var arr = m;
            console.log(m[index].data.about.title !== doc.data().about.title);
            if (
              m[index].data.about.title !== doc.data().about.title ||
              m[index].data.about.subtitle !== doc.data().about.subtitle ||
              m[index].data.about.image !== doc.data().about.image ||
              m[index].data.about.type !== doc.data().about.type ||
              m[index].data.about.groups !== doc.data().about.groups
            ) {
              arr[index].data.about.title = doc.data().about.title;
              arr[index].data.about.subtitle = doc.data().about.subtitle;
              arr[index].data.about.image = doc.data().about.image;
              arr[index].data.about.type = doc.data().about.type;
              arr[index].data.about.groups = doc.data().about.groups;
              return arr;
            }
            console.log(arr);
          }
          return m.some((d) => d.id === doc.id) ? [...m] : [...m, { data: doc.data(), id: doc.id }];
        });
      });

      setLoading(false);
    });

    return () => {
      unsubscribe();
      setEntries([]);
      setLoading(true);
    };
  }, []);

  return (
    <>
      <section id={css.code}>
        <div className={css.container}>
          <div className={css.ident_container}>
            <span className={css.ident}>Repos</span>
          </div>
          {!entries && (
            <>
              {loading && (
                <div className={css.loading}>
                  <div className={css.dots} />
                </div>
              )}
              {!loading && (
                <div className={css.error}>
                  <span className={css.title}>No Repos Found</span>
                </div>
              )}
            </>
          )}
          <ul className={css.grid}>
            {/* <div className={css.ident}>
              <span className={css.title}>Repos</span>
  </div> */}
            {entries &&
              entries
                .sort((a, b) => b.data.about.date.localeCompare(a.data.about.date))
                .map((entry, index) => {
                  return (
                    <Fragment key={index}>
                      <Entry entry={entry} index={index} />
                    </Fragment>
                  );
                })}
          </ul>
        </div>
      </section>
    </>
  );
}

function Entry(props) {
  console.log(props);
  return (
    <Link className={css.entry} href={"/repo/" + props.entry.id}>
      <img src={props.entry.data.about.image} alt={props.entry.data.about.title} className={css.image} />
      <div className={css.about}>
        <span className={css.title}>{props.entry.data.about.title}</span>
        <span className={css.subtitle}>{props.entry.data.about.subtitle}</span>
      </div>
      <div className={css.pills}>
        <Link className={css.date} href={"/repo?date=" + props.entry.data.about.date} tabIndex={-1}>
          {toTitleCase(
            new Date(props.entry.data.about.date).getDate() +
              " " +
              new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(props.entry.data.about.date)) +
              " " +
              new Date(props.entry.data.about.date).getFullYear()
          )}
        </Link>
        {props.entry.data.about.type && (
          <Link className={css.pill} href={"/repo?type=" + props.entry.data.about.type} tabIndex={-1}>
            {toTitleCase(props.entry.data.about.type)}
          </Link>
        )}
        {props.entry.data.about.groups &&
          props.entry.data.about.groups.length > 0 &&
          props.entry.data.about.groups.map((group, index) => {
            return (
              <Link className={css.pill} href={"/repo?group=" + group} tabIndex={-1} key={index}>
                {toTitleCase(group)}
              </Link>
            );
          })}
        {props.index === 0 && <span className={css.latest}>Latest</span>}
      </div>
    </Link>
  );
}
