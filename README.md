# Alexaクイズゲームスキルの構築
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[![音声ユーザーインターフェース](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/1-off.png)](./instructions/1-voice-user-interface.md)[![Lambda 関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/2-off.png)](./instructions/2-lambda-function.md)[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/3-off.png)](./instructions/3-connect-vui-to-code.md)[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/4-off.png)](./instructions/4-testing.md)[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/5-off.png)](./instructions/5-customization.md)[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/6-off.png)](./instructions/6-publication.md)

このAlexaサンプルスキルは、簡単なクイズゲームスキルのテンプレートを提供します。あるトピックの関連する情報のリストを提供すると、Alexaがそのリストから情報を取り出しクイズを出します。

初めてここに訪れ、これからAlexaのスキル開発に取り組もうとする方や、より詳細なガイダンスが必要な方は、下の「Get started!」ボタンをクリックしてください。

<a href="./step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_get_started._TTH_.png" /></a>


下記の追加のリソースにも必ず目を通してください。

##概要
**補足**:このReadmeは、すでに利用を開始できる開発環境があり、CLI(コマンドラインインターフェース)ツールや、[AWS](https://aws.amazon.com/jp/)、[ASK開発者ポータル](https://developer.amazon.com/ja/alexa)の使用経験のある方を想定しています。もし該当しない場合は、[こちら](instruction/0-intro.md)をクリックしてより詳細なチュートリアルから始めてください。

### 使い方

```text
アレクサ、都道府県クイズを開いてクイズを出して。
		>> 了解です。都道府県に関する10個のクイズを出します。
		
アレクサ、都道府県クイズをスタートして。
```

### リポジトリの内容
* `/.ask`	- [ASK CLI (Command Line Interface)の設定](https://developer.amazon.com/docs/smapi/ask-cli-intro.html)	 
* `/lambda/custom` - [AWS Lambda](https://aws.amazon.com/lambda/)にホストされるバックエンド処理
* `/models` - 音声ユーザーインターフェースと言語別の対話モデル
* `/instructions` - 上記「Getting Started!」のチュートリアルガイド
* `skill.json`	- [スキルのマニフェストファイル](https://developer.amazon.com/docs/smapi/skill-manifest.html)

### ASK CLIを使ったセットアップ

### 前提条件

* Node.js (> v4.3)
* [AWSアカウント](https://aws.amazon.com/)の登録
* [Amazon 開発者アカウント](https://developer.amazon.com/)の登録
* [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)のインストールとセットアップ


### インストール
1. ja-JPブランチのリポジトリをクローンします。

	```bash
	$ git clone https://github.com/alexa/skill-sample-nodejs-quiz-game/
	$ git checkout -b ja-JP origin/ja-JP
	```

2. リポジトリのフォルダに移動し、 `ask init` コマンドを実行することで  [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) を初期化します。

	```bash
	$ cd skill-sample-nodejs-quiz-game
	$ ask init
	```

3. `/lambda/custom`ディレクトリに移動し、npm コマンド `npm install` を実行し、npm 関連ファイルをインストールします。

	```bash
	$ cd lambda/custom
	$ npm install
	```

### デプロイ

ASK CLI はスキルとLambda関数を作成します。Lambda関数はデフォルトで ```us-east-1 (Northern Virginia)``` に作成されます。

1. 以下のコマンドを実行するだけでスキルとLambdaのデプロイを一度に行うことができます。

	```bash
	$ ask deploy
	```

### テスト

1. テストするには、Alexa開発者コンソールにログインし、「テスト」タブに行き、スキルのテスト機能を有効にする必要があります。

2. 以下の例のようにコマンドを実行すると、コマンドラインからスキルの音声による対話をシミュレートできます。

	```bash
	 $ ask simulate -l ja-JP -t "都道府県クイズをスタートして"

	 ✓ Simulation created for simulation id: 4a7a9ed8-94b2-40c0-b3bd-fb63d9887fa7
	◡ Waiting for simulation response{
	  "status": "SUCCESSFUL",
	  ...
	 ```

3. テスト機能を有効にすると、開発者アカウントに紐づいているデバイスでもテストすることができます。有効なEchoデバイス、または[echosim.io](https://echosim.io/welcome)や、Amazonモバイルアプリか、次のように話しかけます。

	```text
	アレクサ、都道府県クイズをスタートして。
	```

## カスタマイズ

1. ```./skill.json```

   スキル名、サンプルフレーズ、アイコン、テスト手順などを変更します。

   多くの情報は地域寄って固有なので、en-US, en-GB, ja-JPのようにロケールごとに変更する必要があります。

   より詳しい情報はスキルの [Manifest Documentation](https://developer.amazon.com/docs/smapi/skill-manifest.html) を参照してください。

2. ```./lambda/custom/index.js```

   スキルをカスタマイズするための、Alexaが発声するメッセージや、情報を編集します。

3. ```./models/*.json```

	呼び出し名やインテント毎のサンプル発話を修正する場合、このモデル定義ファイルを変更します。スキルが対応する地域毎にファイルを作成する必要があります。


##追加のリソース

### コミュニティ
* [Amazon 開発者フォーラム](https://forums.developer.amazon.com/spaces/293/index.html) - Alexaのスキル開発で困ったら、ここで質問できます。Amazonの中の人、またはスキル開発の先人達からアドバイスをもらえるでしょう。

### チュートリアル / ガイド
* [音声デザインガイド](https://developer.amazon.com/ja/designing-for-voice/) - 対話と音声ユーザーインターフェースデザインの学習に役立ちます。全てのAlexa開発者に読んでいただきたい有用な資料です。

### ドキュメント
* [Alexa Skills Kit for Node.js SDK](https://www.npmjs.com/package/alexa-sdk) - Node.js SDK のオフィシャルドキュメント(英語)
* [Alexa Skills Kitによるスキルの作成](https://developer.amazon.com/ja/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html) - Alexa Skills Kit のオフィシャルドキュメント(日本語)
