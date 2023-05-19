import { getPrismicClient } from "@/services/prismic";
import { GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import Link from "next/link";

import React, { useEffect } from "react";
import styles from "../post.module.scss";
import { getStaticProps } from "../index";
import { useRouter } from "next/router";

interface IPostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

const PostPreview: React.FC<IPostProps> = ({ post }) => {
  const session = useSession().data
  const router = useRouter()
  useEffect(() => {
    if(session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href={'/'}>
              <span>Subscribe now</span>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
};

export default PostPreview;

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("post", String(slug), {});
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
    redirect: 60 * 30
  };
};
