'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import type { BlogPost } from '@/lib/data';
import { cn } from '@/lib/utils';

type BlogSectionProps = {
  blogPosts: BlogPost[] | null;
  showTitle?: boolean;
  showViewAllButton?: boolean;
};

export function Blog({ blogPosts, showTitle = true, showViewAllButton = false }: BlogSectionProps) {
  const isDataLoaded = blogPosts !== null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="blog"
      className={cn("border-t", !showTitle && "py-16 md:py-24 lg:py-32")}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
        {showTitle && (
            <motion.div className="text-center" variants={itemVariants}>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Son Yazılarımız
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Sektorla bağlı ən son xəbərlər, yeniliklər və məqalələr.
            </p>
            </motion.div>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isDataLoaded && blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                className="h-full"
              >
                <Card className="glass-card group flex h-full flex-col overflow-hidden transition-all duration-300">
                  <Link href={`/blog/${post.slug}`} aria-label={post.title} className="overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="h-auto w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </Link>
                  <CardHeader>
                    <CardTitle>
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="link" className="p-0">
                      <Link href={`/blog/${post.slug}`}>
                        Ətraflı oxu <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : isDataLoaded && blogPosts.length === 0 ? null : (
            Array.from({ length: 3 }).map((_, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="glass-card flex h-full flex-col overflow-hidden">
                  <Skeleton className="h-[250px] w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent className="flex-grow space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-5 w-24" />
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
        {showViewAllButton && isDataLoaded && blogPosts.length > 0 && (
             <motion.div className="text-center" variants={itemVariants}>
                <Button asChild size="lg" variant="outline">
                    <Link href="/blog">Bütün Yazılara Bax</Link>
                </Button>
            </motion.div>
        )}
      </div>
    </motion.section>
  );
}
