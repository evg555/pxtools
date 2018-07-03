<?php
    $post = $_POST['response'] ?? '';

    if($post){
        $userData = $post["user_data"] ?? [];
        $topData = $post['top_data'] ?? [];
    }
?>



<a class="return" href="/">Назад</a>

<div class="inner">
    <nav>
        <h3>Список продвигаемыъх URL:</h3>
        <ul>
            <li><a href="/">http://site.ru</a></li>
            <li><a href="/">http://site.ru/article1/</a></li>
            <li><a href="/">http://site.ru/article2/1.html</a></li>
        </ul>
    </nav>

    <div class="inner-container">
        <h2>Результаты анализа:</h2>

        <table border="1">
            <tr>
                <td>Анализируемый фактор</td>
                <td>Данные продвигаемого URL</td>
                <td>Данные по ТОП</td>
            </tr>
            <tr>
                <td>Объем текста в словах / символах</td>
                <td><?=$userData['text_volume']['words']?> / <?=$userData['text_volume']['symbols']?> (849 / 7 378) </td>
                <td><?=$topData['text_volume']['words']?> / <?=$topData['text_volume']['symbols']?> 378</td>
            </tr>
            <tr>
                <td>Количество точных вхождений запроса в текст</td>
                <td><?=$userData['text_volume']['query_in_text_exact']?></td>
                <td><?=$topData['text_volume']['query_in_text_exact']?></td>
            </tr>
            <tr>
                <td>Процент вхождения слов из запроса в текст</td>
                <td>
                    <p><?=$userData['text_volume']['query_words_in_text_percent']['word']?>: <?=$userData['text_volume']['query_words_in_text_percent']['percent']?>% (0.9%)</p>
                    <p><?=$topData['text_volume']['query_words_in_text_percent']['word']?>: <?=$topData['text_volume']['query_words_in_text_percent']['percent']?>% (1.5%)</p>
                </td>
                <td>
                    <p>купить: 0% (0.9%)</p>
                    <p>canon: 0% (1.5%)</p>
                </td>
            </tr>
            <tr>
                <td>Вхождения слов из запроса в тег Title</td>
                <td>
                    <p><?=$userData['text_volume']['query_words_in_title']['word']?>: <?=$userData['text_volume']['query_words_in_title']['count']?>% (0.9%)</p>
                    <p><?=$topData['text_volume']['query_words_in_title']['word']?>: <?=$topData['text_volume']['query_words_in_title']['count']?>% (1.5%)</p>
                </td>
                <td>
                    <p>купить: 0% (0.9%)</p>
                    <p>canon: 0% (1.5%)</p>
                </td>
            </tr>
            <tr>
                <td>Вхождения в анкоры исходящих ссылок</td>
                <td>
                    <p><?=$userData['text_volume']['query_words_in_anchors']['word']?>: <?=$userData['text_volume']['query_words_in_anchors']['count']?>% (0.9%)</p>
                    <p><?=$topData['text_volume']['query_words_in_anchors']['word']?>: <?=$topData['text_volume']['query_words_in_anchors']['count']?>% (1.5%)</p>
                </td>
                <td>
                    <p>купить: 0% (0.9%)</p>
                    <p>canon: 0% (1.5%)</p>
                </td>
            </tr>
            <tr>
                <td>Внутренних исходящих ссылок на странице</td>
                <td>0 (794)</td>
                <td>794.3 </td>
            </tr>
            <tr>
                <td>Процент вхождения переколдовок в текст</td>
                <td>
                    <p>купить: 0% (0.9%)</p>
                    <p>canon: 0% (1.5%)</p>
                    <p>кэнон: 0%</p>
                    <p>екатеринбург: 0% (0.2%)</p>
                    <p>покупать: 0%</p>
                </td>
                <td>
                    <p>купить: 0% (0.9%)</p>
                    <p>canon: 0% (1.5%)</p>
                    <p>кэнон: 0%</p>
                    <p>екатеринбург: 0% (0.2%)</p>
                    <p>покупать: 0%</p>
                </td>
            </tr>
            <tr>
                <td>Отсутствие в тексте слов, которые часто встречаются у конкурентов</td>
                <td>
                    <?if($userData['text_volume']['popular_words']):?>
                        <?foreach ($userData['text_volume']['popular_words'] as $popular_word):?>
                            <?=$popular_word.", "?>
                        <?endforeach;?>
                    <?endif;?>
                </td>
                <td>
	                <?if($topData['text_volume']['popular_words']):?>
                        <?foreach ($topData['text_volume']['popular_words'] as $popular_word):?>
                            <?=$popular_word.", "?>
                        <?endforeach;?>
	                <?endif;?>
                </td>
            </tr>
            <tr>
                <td>Число релевантных документов по тегу Title</td>
                <td><?=$userData['text_volume']['rel_docs_by_title']?></td>
                <td><?=$topData['text_volume']['rel_docs_by_title']?></td>
            </tr>
            <tr>
                <td>Длина тега Title в словах / символах</td>
                <td><?=$userData['text_volume']['title_volume']['words']?> / <?=$userData['text_volume']['title_volume']['symbols']?> (13 / 103)</td>
                <td><?=$topData['text_volume']['title_volume']['words']?> / <?=$topData['text_volume']['title_volume']['symbols']?></td>
            </tr>
            <tr>
                <td>Внешних ссылок на домен</td>
                <td>508 (6724) </td>
                <td>7232</td>
            </tr>
            <tr>
                <td>тИЦ</td>
                <td><?=$userData['text_volume']['tcy']?> (1490)</td>
                <td>1<?=$topData['text_volume']['tcy']?></td>
            </tr>
            <tr>
                <td>Наличие HTTPS и доля конкурентов на HTTPS</td>
                <td><?($userData['text_volume']['https'] ? "Да" : "Нет")?></td>
                <td><?($topData['text_volume']['https'] ? "Да" : "Нет")?></td>
            </tr>
            <tr>
                <td>Наличие номера 8 800 и доля конкурентов c 8 800</td>
                <td><?echo ($userData['text_volume']['8800'] ? $userData['text_volume']['8800']: "Нет")?></td>
                <td><?echo ($topData['text_volume']['8800'] ? $topData['text_volume']['8800'] : "Нет")?></td>
            </tr>
        </table>

        <h2>Анализируемый список URL:</h2>

        <ul>
			<?for ($i = 1;$i < 6;$i++):?>
                <li><?=$i?>. URL<?=$i?></li>
			<?endfor;?>
        </ul>
    </div>
</div>