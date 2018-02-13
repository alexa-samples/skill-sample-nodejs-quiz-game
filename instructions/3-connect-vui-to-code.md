# Alexaクイズゲームスキルの作成
[![音声ユーザーインターフェース](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/1-locked.png)](1-voice-user-interface.md)[![Lambda 関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/2-locked.png)](2-lambda-function.md)[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/3-on.png)](3-connect-vui-to-code.md)[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/4-off.png)](4-testing.md)[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/5-off.png)](5-customization.md)[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/navigation/6-off.png)](6-publication.md)

<!--<a href="1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png" /></a><a href="2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png" /></a><a href="3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-on._TTH_.png" /></a><a href="4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png" /></a><a href="5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png" /></a><a href="6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png" /></a>-->

## 音声ユーザーインターフェースをLambda関数に接続する

このガイドの [1ページ目](1-voice-user-interface.md) で、インテントとエンドユーザーから期待するサンプル発話の設定をして、音声ユーザーインターフェースを作成しました。[2ページ目](2-lambda-function.md) では、Lambda関数を作成して、このスキルに必要な全てのロジックを実装しました。このページでは、これら2つを接続します。

1.  **[Amazon開発者ポータル](https://developer.amazon.com/edw/home.html#/skills/list) に戻り、一覧からあなたのスキルを選びます。** このチュートリアルを冒頭から始めていれば、ブラウザーのタブに残っていることでしょう。

2.  左側にある **設定** タブを開きます。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/3-2-configuration-tab.png)

3.  エンドポイントとして **AWS Lambda ARN** を選択します。コードは好みのサーバー上にホスティングできますが、単純化とコスト削減のため、ここではAWS Lambdaを利用します。ウェブサービスとしてカスタムスキルをホスティングする方法については[こちら](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-web-service)を参照してください。. AWSの無料利用枠を利用することで、毎月100万回のLambda関数の起動、320万秒のコンピューティング時間が無料で使えます。無料利用枠については[こちら](https://aws.amazon.com/jp/free/)を参照してください。さらに、現在Amazonは[Alexaスキル開発者向けのAWSプロモーションクレジット](https://developer.amazon.com/ja/alexa-skills-kit/alexa-aws-credits)も提供しています。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/3-3-aws-lambda-arn._TTH_.png)

4.  必要に応じて**エンドポイントの地理的リージョン**を選択してください。ここでは「いいえ」のままにしておきます。
	
	**重要**:リージョンを選択する場合は、Lambda関数を作成したリージョンと同じリージョンを選んでください。

5.  Lambda関数の **ARN (Amazon Resource Name)**を表示されているテキストボックスに貼り付けてください。上のスクリーンショットのようになります。

6.  **アカウントリンク** は **いいえ** のままにします。このスキルではアカウントリンクは利用しません。アカウントリンキングの詳細については[Alexaユーザーとシステムユーザーを関連付ける](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/linking-an-alexa-user-with-a-user-in-your-system)を参照してください。

7.  **「次へ」**ボタンをクリックして、このガイドの4ページに進みましょう。

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/quiz-game/1-6-next-button._TTH_.png)


[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/general/buttons/button_next_testing.png)](4-testing.md)

