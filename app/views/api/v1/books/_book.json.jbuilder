json.html (
                          "&lt;div class=&quot;row&quot;&gt;
               &lt;div class=&quot;col-lg-2 col-sm-2&quot;&gt;
                  &lt;div class=&quot;well&quot;&gt;
                     &lt;p&gt;&lt;b&gt;title&lt;/b&gt;&lt;/p&gt;
                     &lt;p&gt;#{book.title}&lt;/p&gt;
                  &lt;/div&gt;
               &lt;/div&gt;
               &lt;div class=&quot;col-lg-2 col-sm-2&quot;&gt;
                  &lt;div class=&quot;well&quot;&gt;
                     &lt;p&gt;&lt;b&gt;author&lt;/b&gt;&lt;/p&gt;
                     &lt;p&gt;#{book.author}t&lt;/p&gt;
                  &lt;/div&gt;
               &lt;/div&gt;
               &lt;div class=&quot;col-lg-8 col-sm-8&quot;&gt;
                  &lt;div class=&quot;well&quot; style=&quot;margin-bottom: 0px&quot;&gt;
                     &lt;p&gt;&lt;b&gt;content&lt;/b&gt;&lt;/p&gt;
                     &lt;p&gt;#{book.content}&lt;/p&gt;
                  &lt;/div&gt;
                  &lt;button type=&quot;button&quot; class=&quot;btn-danger&quot; data-book-id=&quot;#{book.id}&quot; onclick=&quot;deleteBook(this)&quot; style=&quot;margin-bottom: 5px;margin-top: 5px&quot;&gt;Delete&lt;/button&gt;
                  &lt;button type=&quot;button&quot; class=&quot;btn-primary&quot; data-book-id=&quot;#{book.id}&quot; onclick=&quot;editBook(this)&quot; style=&quot;margin-bottom: 5px;margin-top: 5px;margin-left:10px&quot;&gt;Edit&lt;/button&gt;
               &lt;/div&gt;
            &lt;/div&gt;
            "
          )