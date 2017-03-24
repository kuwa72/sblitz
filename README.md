# sblitz
Read text faster speed

## これは何？

Sblitzは[Spritz](http://spritzinc.com/)（[このツイート](https://twitter.com/buddhobhagavan/status/659141226654908416)から知った）にインスパイアされた速読ツールです。Spritzは文章を単語で分けて、単語を短時間ずつ連続表示する仕組みで、普通に読むより5倍速く読めるそうです。Sblitzはこれを日本語に適用したらどうなるかという実証ツールです。ただし既に同じコンセプトのアプリがあるようです……。

Spritzが対象としている言語（英仏伊など）は単語をスペース区切りで羅列することで文章を組み立てます。そういう言語では単語ごとに表示するのも容易ですが、日本語の場合は単語の区切りが、少なくともコンピュータにとっては明確でないので、単語毎に区切る＝分かち書きをしなければなりません。

日本語分かち書きのツールは、MecabやChasenといった形態素解析ツール、Kakashiのような分かち書き専用のものなど、いくつか存在しています。SblitzではJavaScriptで書かれている[TinySegmenter](http://chasen.org/~taku/software/TinySegmenter/)を使用しています。というか、このライブラリを知らなければSblitzを作ることはなかったでしょう。SblitzはTinySegmenterで分かち書きした結果を、Spritzのように表示しています。

内部的なことでいうと、UIの制御はReactで行っています。ベースは[create-react-app](https://github.com/facebookincubator/create-react-app)で生成しています。コマンドを叩いたときの指示に従うとGithub PagesにSPAを容易に作れるようになっていて非常に助かりました。CSSフレームワークとしてはBootstrapを使用しています。

UI的にまだ微妙なのでなかなか使ってもらえないと思いますが、実際に速読できるか、どういう文章でどのくらいの速度だと読みやすかったかなど教えてもらえると僕が喜びます。

## TODO

* 表示間隔をテキストからリストボックスに変えると良いのでは。
* 表示間隔を保存したい。
* 外部からテキストを渡せないか？
* ちょっと目を離した時がつらいのでオペレーションを考え直したい。何かを押している間だけ進むとかがよいのでは。
