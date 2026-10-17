# Quỷ Mù REV P — Hướng dẫn dựng vách và làm cơ chế cửa

Bản ngày 17/10/2026. Viết theo từng việc để người mới có thể đọc bản vẽ, làm mô hình thử, đặt đúng phụ kiện và phối hợp với thợ lắp bản thật.

**Bắt đầu bằng một cửa mẫu và một tường xoay mẫu. Chỉ nhân ra toàn bộ sau khi hai mẫu hoạt động ổn định và nhả khẩn được.** Bản 3D hiện tại là thiết kế bố trí và logic trò chơi; chưa có tính toán kết cấu, bản vẽ chế tạo trục, tải neo, khoảng chống kẹp hoặc thiết kế điện an toàn. Phần vách cao 3 m, neo chịu lực và cơ cấu chuyển động dùng cho khách cần người có chuyên môn chốt thiết kế trước khi làm. Hướng dẫn này không biến các thông số mô phỏng thành kích thước cắt vật tư.

## 1. Mở đúng bộ hồ sơ

- [Viewer 360°, bốn trạng thái và góc nhìn ra làng](model-360.html).
- [Mặt bằng và các bản K-01 đến K-08](blueprint/index.html).
- [Báo cáo thay đổi REV O → REV P](HUONG-DAN.html).
- [Nguồn layout duy nhất](src/layout.js): dùng để đối chiếu vị trí, chiều cửa, trục xoay.
- [Phương án nhả khẩn E1](blueprint/K-08-nha-khan.html) và [kết quả kiểm tra](emergency-plan.json).
- [Tải trọn bộ ZIP](Quy-Mu-REV-P.zip).

REV P giữ thứ tự **Làng → Giam → Người canh → Tế → thoát**. Có 22 cửa một chiều, 4 tường xoay X1–X4, 2 khóa tuyến L1–L2 và 1 panel nhả khẩn E1. C01–C06 là mã cửa ra/vào và cửa phòng; không cộng chúng vào số 22 cửa một chiều. Nhả khẩn là chức năng an toàn của cơ cấu hiện có, không phải câu đố mới.

24 bot hoàn thành trong 616,46–729,51 giây ở 1,2 m/s, không cộng thời gian chờ hay giải đố. Tuyến biết trước bản đồ chỉ khoảng 105,42 m, tương đương 87,85 giây. Mốc trên 600 giây là kết quả phép thử bot, không phải thời gian cam kết cho khách. Cả 8 lượt bám tường trái/phải bị lặp; không được lấy lượt lặp làm bằng chứng khách sẽ chơi đủ lâu.

## 2. Hiểu kích thước trước khi mua vật tư

| Mục | Giá trị trong mô hình | Cách dùng khi thi công |
|---|---:|---|
| Khung bố trí | 11 × 11 m | Là khoảng giữa các đường biên mô hình; phải xác nhận cách đặt tim/mặt vách với mặt bằng thật |
| Lưới | 12 × 12 ô | Đánh số x, z từ 0 đến 11 |
| Bước ô | 916,667 mm | Khoảng cách giữa hai đường lưới; không phải bề rộng cánh cửa |
| Vách | dày 160 mm, cao 3.000 mm | Bao gồm phần hoàn thiện nếu cần giữ đúng hình học |
| Cửa C01–C06 | tham số rộng 660 mm, cao 2.100 mm | Phải đo lại thông thủy sau khung, bản lề, tay nắm và nẹp |
| Hành lang giữa hai vách song song cách một ô | khoảng 756,667 mm | Chỉ là 916,667 − 160; chỗ giao, phụ kiện và cánh mở có thể làm hẹp hơn |

Gốc ở góc trái trên mặt bằng; x tăng sang phải, z tăng xuống dưới. Tọa độ `[x,z]` trong bảng cơ cấu là **ô**, còn tọa độ trục/đoạn tường tính bằng **mét**. Tâm ô `[x,z]` là `((x+0,5) × 11/12; (z+0,5) × 11/12)`.

Các đường `WALLS` là tim vách. Vách biên có bề dày nên bề mặt có thể vượt đường tim 0 hoặc 11 m. Không dựng thẳng vào căn phòng thông thủy 11 × 11 m rồi tự dịch vách vào trong: cách đó sẽ làm hẹp lối. Đo hiện trường và thống nhất đường chuẩn trước; nếu phải đổi bố trí, sửa layout và kiểm tra lại.

Chiều rộng trong bản này chưa phải xác nhận đáp ứng yêu cầu thoát nạn hoặc tiếp cận của công trình. Người phụ trách công trình phải duyệt kích thước sử dụng thực tế trước khi mở cho khách. Không thu hẹp lối để tăng độ khó.

## 3. Làm thử theo thứ tự này

1. **Mô hình bàn tỉ lệ 1:10:** nền 1.100 × 1.100 mm, ô 91,667 mm; dùng bìa/foam nhẹ. Vẽ tim bằng thước, dán mã vách/cửa. Làm bốn tường xoay bằng bìa và chốt nhỏ. Mô hình này chỉ kiểm tra bố trí, không kiểm tra tải trọng hay chống kẹp.
2. **Đánh dấu sàn thật:** căng hai đường vuông góc, kiểm tra hai đường chéo, chia lưới. Dán băng màu lên toàn bộ tim vách, cửa và vùng quét X1–X4. Đi thử Làng → Giam → Người canh → Tế → thoát khi chưa dựng vách.
3. **Dựng một cửa một chiều mẫu** bằng đúng khung và bộ phụ kiện dự kiến. Thử cả chế độ chơi và nhả khẩn.
4. **Dựng một tường xoay mẫu** trong khu thử có rào giới hạn. Đo hành trình, khe, độ võng và lực vận hành; dùng tải hoàn thiện thật sau khi hệ đỡ đã được duyệt.
5. **Chốt bản vẽ chế tạo:** ghi rõ kích thước từng khung/cánh, loại vật liệu, tải, phụ kiện, vị trí neo, khe lắp và vùng quét. Chỉ lúc này mới đặt cắt hàng loạt.
6. **Dựng vách cố định**, sau đó lắp khung cửa, cơ cấu, nhả khẩn, rồi mới ốp trang trí. Chừa nắp bảo trì nhìn thấy được từ phía nhân viên.
7. **Chạy nghiệm thu không có khách**, kiểm tra từng cơ cấu, từng pha và toàn bộ tuyến. Sau đó mới thử vận hành có giám sát.

## 4. Chuẩn bị đồ nghề và bảng vật tư

Đồ đo/lắp: thước cuộn, thước vuông, máy cân bằng hoặc dây dọi, bút đánh dấu, kẹp giữ, khoan theo vật liệu, dụng cụ siết đúng đầu, giá kê và thiết bị nâng phù hợp. Cắt/khoan trên bàn làm việc; không giữ cánh nặng bằng tay trong lúc bắt trục. Dùng bảo hộ theo công việc và hướng dẫn dụng cụ.

| Cụm | Số bộ | Mỗi bộ cần có |
|---|---:|---|
| Cửa một chiều | 22 | Khung chịu lực; cánh nhẹ; bộ bản lề/trục phù hợp; bộ tự đóng có chỉnh; cơ cấu hạn chế chiều có thể nhả; chặn hành trình; che khe; tay đẩy/nhận diện; cách nhả bằng tay |
| Tường xoay | 4 | Khung cánh; hệ trục đỡ dưới và dẫn hướng trên đồng trục; khung kết cấu đỡ; chặn ở hai vị trí; bộ giữ vị trí có nhả; che vùng kẹp; tay vận hành ngoài vùng quét; xác nhận vị trí |
| Cửa ẩn L1, L2 | 2 | Khung; cánh; bộ ray/con trượt phù hợp; dẫn hướng; chống nhấc/chống rơi; chặn cuối; giữ đóng/mở có nhả; tay mở khẩn; chỗ đỗ cánh đã kiểm tra |
| Panel E1 | 1 | Khung; cánh được giữ chống đổ/rơi; cơ cấu mở nhanh bằng tay; tay thao tác hai phía; giữ mở; biển nhận diện khi khẩn |
| Cửa C01–C06 | 6 vị trí | Bộ khung/cánh phù hợp chức năng, mở được theo kế hoạch thoát nạn đã duyệt |
| Vách cố định | Theo bảng vách ở cuối | Khung, liên kết với kết cấu đã duyệt, tấm ốp, nẹp bo cạnh, nắp bảo trì |

Đây là số **cụm**, chưa phải số bản lề, vít hay mét thép. Không chọn phụ kiện chỉ theo cân nặng: nhà cung cấp cần biết chiều cao, chiều rộng, bề dày cánh, vị trí trọng tâm và tần suất sử dụng. Ví dụ tài liệu bản lề lò xo Ives 3SP1 giới hạn theo cả kích thước cửa lẫn khối lượng; bảng của mẫu đó không đủ để suy ra nó chịu được vách cao 3 m. [Hướng dẫn chính hãng Ives](https://us.allegion.com/content/dam/allegion-us-2/web-documents-2/InstallInstructions/Ives_3SPI_Spring_Hinge_Installation_Instructions_113960.pdf).

Điền phiếu này cho **mỗi loại cánh** trước khi đặt hàng:

| Thông tin | Giá trị phải điền |
|---|---|
| Mã cánh / vị trí | … |
| Kích thước phủ bì sau hoàn thiện | rộng … / cao … / dày … mm |
| Khối lượng đã cân, gồm ốp và phụ kiện | … kg |
| Trọng tâm so với trục | … mm; xác định bằng bản vẽ hoặc đo |
| Vật liệu và kết cấu nhận neo | … |
| Bộ phụ kiện / tài liệu lắp / giới hạn áp dụng | … |
| Khe quanh cánh và thông thủy nhỏ nhất | … mm; có bản vẽ đối chiếu |
| Lực vận hành đo được / tiêu chí được duyệt | … N / … |
| Người duyệt kết cấu và cơ khí / ngày | … |

## 5. Dựng vách cố định

1. Đối chiếu bảng tim vách ở cuối với K-01. Đánh mã từng đoạn lên sàn và trên khung; nhận diện E1 để không bị ốp thành vách cố định.
2. Chọn hệ khung và tấm ốp phù hợp công trình. Lớp giả đá chỉ là trang trí, không chịu bản lề hoặc trục. Không dùng lớp trang trí giòn/nặng ở mép cánh chuyển động.
3. Gia công khung theo bản vẽ đã duyệt. Đo đường chéo để kiểm tra vuông; thử dựng, chống tạm trước khi liên kết. Vách cao 3 m cần hệ ổn định riêng, không chỉ đứng bằng chân nhỏ trên sàn.
4. Neo vào đúng kết cấu đã khảo sát. Không khoan neo theo khoảng cách tự đoán, không coi trần trang trí là điểm chịu lực. Loại neo, số lượng và chiều sâu do người thiết kế chọn theo nền thực tế.
5. Lắp thử khung cửa và cơ cấu khi chưa đóng kín hai mặt. Đo lại lối đi tại chỗ hẹp nhất, kể cả tay nắm và nẹp.
6. Chỉ ốp kín sau khi cửa hoạt động và còn tiếp cận được vít/trục/khóa để bảo trì. Bo các cạnh tiếp xúc; cố định dây và đồ trang trí ngoài vùng quét.

## 6. Cửa một chiều — làm một bộ chuẩn rồi nhân 22 bộ

**Cách hoạt động:** khách đi từ ô `from` sang ô `to` thì đẩy qua được; cánh tự trở về. Ở chiều ngược lại, cơ cấu hạn chế chiều giữ cửa trong chế độ chơi. Khi nhả khẩn, cả hai phía phải đi qua được hoặc cánh được giữ hoàn toàn ngoài lối.

```text
Chế độ chơi:       ô from  ─── đẩy qua ───>  ô to
                   khung — trục — cánh — bộ hạn chế chiều
Nhả khẩn:          ô from  <── đi qua ───>  ô to
                   bộ hạn chế đã nhả; cánh không cản đường
```

**Chọn phần cứng trước:** yêu cầu nhà cung cấp một bộ có khả năng nhả hạn chế chiều đúng yêu cầu trên. Bản lề chỉ mở một phía cộng nẹp chặn cố định sẽ không tự trở thành cửa hai chiều khi cắt điện. Không làm chốt tự chế nhả dưới tải mà chưa kiểm tra. Phương án có thể là cơ cấu chặn có nhả và trục cho phép mở hai phía, hoặc giữ cánh ở vị trí đỗ hoàn toàn thoáng; phải kiểm tra trên mẫu thật và trong mặt bằng.

Các bước lắp:

1. Dán mũi tên `from → to` lên sàn. Chọn cạnh đặt trục và phía đỗ cánh bằng bản vẽ vùng quét; layout mới quy định **chiều đi**, chưa quy định tay bản lề.
2. Cố định khung chịu lực, kiểm tra đứng và vuông. Đo ô khung hoàn thiện, rồi tính cánh theo khe của bộ phụ kiện; không cắt cánh rộng 916,667 mm chỉ vì đó là bước ô.
3. Đánh dấu lỗ theo dưỡng của nhà sản xuất. Kê cánh bằng giá; lắp đủ liên kết quy định. Với bản lề liên tục, hướng dẫn Ives yêu cầu lắp đầy đủ các vít được chỉ định; không thay bằng vài vít bắt vào tấm ốp. [Tài liệu lắp Ives 700/715/705/711](https://us.allegion.com/content/dam/allegion-us-2/web-files/ives/installation-documents/Ives_700_715_705_711_Continuous_Hinge_Installation_Instructions_116335.pdf).
4. Lắp tự đóng theo đúng tài liệu của bộ đã mua. Chỉnh mức thấp nhất vẫn đóng hết hành trình; không siết mạnh để làm trò chơi khó hơn. Kiểm tra cánh không quật vào người sau khi thả. Mỗi mẫu bản lề có giới hạn chỉnh riêng. [Ví dụ quy trình của Ives 3SP1](https://us.allegion.com/content/dam/allegion-us-2/web-documents-2/InstallInstructions/Ives_3SPI_Spring_Hinge_Installation_Instructions_113960.pdf).
5. Lắp hạn chế chiều, chặn hành trình và che khe trục. Chặn phải truyền lực về khung đủ khả năng chịu lực; không để lực đẩy cuối hành trình bẻ bản lề.
6. Lắp nhả bằng tay tại chỗ và chức năng nhả chung theo thiết kế an toàn. Nhả từ hai phía, kiểm tra khi đang có lực tì lên cánh bằng dụng cụ thử; không dùng người để tạo tình huống kẹt.
7. Đo lại lối đi khi mở hết. Nếu cánh/khung làm hẹp hành lang hoặc chặn cửa kế bên, dừng để sửa thiết kế, không đổi chiều mũi tên tùy ý.
8. Ghi mã OW01–OW22, hướng, loại phụ kiện, ngày lắp và kết quả thử. OW là mã thi công theo thứ tự trong `ONEWAY`; bảng tọa độ ở cuối được sinh từ cùng dữ liệu.

## 7. Tường xoay X1–X4 — quay 90° giữa hai vị trí

Tường xoay là cánh vách đổi từ đoạn `before` sang đoạn `after` quanh `post`. Trục là đường thẳng đứng; không phải tâm cánh. X1/X2 đổi khi mở L1; X3/X4 đổi khi mở L2.

```text
Nhìn ngang:                     Nhìn từ trên (ví dụ một cánh):
Khung kết cấu đỡ                 vị trí B
       │ dẫn hướng trên             │
       │                            │  vùng quét 90°
       │ cánh vách                  O──────── vị trí A
       │                            O = trục
       ● trục đỡ dưới
Kết cấu nền nhận tải
```

Quy trình làm mẫu thủ công:

1. Từ bảng X ở cuối, đánh dấu trục và hai đường tim cánh trên sàn. Dùng dưỡng bìa bằng **kích thước phủ bì thực**, gồm nẹp và tay vận hành, xoay thử toàn bộ hành trình. Kiểm tra cả góc cánh, vùng sát trục, vách kế bên và đầu người. Hình 3D ở hai đầu hành trình chưa chứng minh phần cứng không va chạm ở giữa.
2. Chọn trọn bộ trục dưới chịu tải và dẫn hướng trên tương thích, cùng khung kết cấu nhận tải. Không treo tường cao 3 m bằng bản lề nội thất chọn theo cảm tính. Lắp các trục theo cùng một đường dọi; hệ pivot của Ives cũng yêu cầu phối hợp đúng bộ trục trên/dưới và phụ kiện trung gian. [Tài liệu lắp pivot Ives](https://us.allegion.com/content/dam/allegion-us-2/web-files/ives/installation-documents/Ives_7244F_7245F_1-1_2in_Intermediate_Pivot_Installation_Instructions_107133.pdf).
3. Làm cánh khung nhẹ, cứng, không vặn. Kích thước đầu trục, đầu tự do và khe lắp lấy từ thiết kế bộ pivot; đoạn tim dài một ô chưa phải chiều dài cắt cánh. Lắp bằng giá kê/thiết bị nâng; giữ chống đổ đến khi hệ đỡ hoàn chỉnh.
4. Lắp chặn cơ khí tại A và B, rồi bộ giữ vị trí. Không dùng chính động cơ hoặc ma sát trục làm chặn duy nhất. Cánh phải được giữ chắc khi khách tì vào ở mỗi vị trí.
5. Bố trí tay điều khiển phía nhân viên, ngoài vùng quét; che khe kẹp và phần truyền động. Không khoét lỗ tay vào vị trí có thể bị ép giữa cánh và vách.
6. Thử bằng tay trong khu đã cách ly. Đánh dấu điểm nặng/kẹt, kiểm tra độ nghiêng, võng, rung và va chạm. Không tăng lực để vượt chỗ kẹt; tìm nguyên nhân và sửa.
7. Thử đúng trình tự nhả E1 và 22 cửa một chiều trước khi chuyển vị trí. Sau khi cánh được giữ ở B mới xác nhận pha mới.

**Bản có động cơ là một hạng mục riêng.** Cần thiết kế bảo vệ vùng quét, phát hiện kẹt, giám sát vị trí/nhả, dừng khẩn và điều khiển an toàn bởi người có chuyên môn. Không dùng Arduino, timer hay cảm biến trang trí làm lớp bảo vệ duy nhất. Chưa có sơ đồ điện hoặc tải cơ khí được duyệt thì chỉ thử mẫu thủ công trong vùng cách ly; không chạy tự động cạnh khách. Thời gian hoạt cảnh trong viewer không phải tốc độ xoay an toàn đã xác định.

## 8. Cửa ẩn L1, L2 và cửa phòng

L1 mở sau Giam để tiếp cận Người canh; L2 mở sau Người canh để tiếp cận Tế. Chọn phương án mẫu **trượt bằng tay** với bộ ray đồng bộ có tải phù hợp. Ray có thể đỡ dưới hoặc treo trên tùy thiết kế; nếu treo, kết cấu đỡ phía trên phải được tính tải.

1. Đánh dấu đoạn đóng từ bảng L. Vẽ cả cánh khi đóng, khi mở và đường trượt.
2. Xác nhận có **chỗ đỗ đủ cho toàn bộ cánh** và phụ kiện trong vùng cho phép. Layout hiện chưa thiết kế hốc giấu cánh. Không tự mở hốc vào phòng, vượt khung 11 × 11 m hoặc làm dày vách lấn hành lang. Nếu không có chỗ đỗ, cần thiết kế lại cơ cấu và kiểm tra layout trước khi chế tạo.
3. Lắp ray vào kết cấu chịu lực, cân thẳng theo hướng dẫn bộ ray; lắp chặn cuối trước khi thả con trượt chạy tự do.
4. Lắp chống nhấc/chống rơi và dẫn hướng; không bỏ dẫn hướng dưới chỉ để cửa nhìn đẹp. Lắp cánh rồi kiểm tra toàn hành trình không lệch hoặc tự trôi.
5. Lắp giữ đóng/giữ mở và tay nhả từ hai phía. Giấu đường ghép bằng hoa văn/sơn, không dùng nẹp bắc qua khe làm kẹt cửa.
6. Thử mở bằng tay khi mất điện và khi điều khiển trò chơi hỏng. Không dùng ổ khóa cần chìa riêng làm cách thoát duy nhất.

C03–C05 giữ vị trí cửa phòng theo layout. C01 là lối vào; C02 là cổng làng vào mê cung; C06 là cửa thoát trò chơi mở ở S3. Việc C06 bị khóa trong mô phỏng **không cho phép khóa chặn thoát người trong công trình thật**: cách mở khẩn và lối ra cuối cùng phải hoạt động độc lập với tiến độ câu đố, được duyệt cùng phương án thoát nạn.

## 9. E1 và cách nhả khẩn

E1 là panel trên đoạn `x = 2,75 m`, từ `z = 6,416667` đến `7,333333 m`, nối ô `[2,7] ↔ [3,7]`. Bình thường đóng như vách. Làm cánh có hệ đỡ, mở/giữ mở được từ hai phía; không dùng tấm nặng tháo rời phải nhấc ra mới đi qua. Vị trí bản lề và chỗ đỗ cần được kiểm tra riêng để cánh mở không chiếm đường cứu hộ.

**Nhả khẩn phải giải phóng lối đi. Dừng động cơ thôi chưa đủ.** Khi chuyển pha, kiểm tra đồ thị hiện tại giả định E1 mở và cả 22 cửa một chiều cho đi hai chiều. Nếu bản thật không làm được điều đó, kết quả kiểm tra đường về cổng không còn áp dụng.

Trình tự chuyển S0 → S1 hoặc S1 → S2:

1. Dừng diễn/đuổi; xác nhận không có người hoặc vật trong toàn vùng chuyển động và vị trí đỗ cánh.
2. Mở E1, nhả hạn chế chiều của 22 cửa; xác nhận thực tế đã thông. Nhả bằng tay tuần tự chỉ dùng khi khu thử đã cách ly; vận hành có khách cần phương án nhả chung được thiết kế và kiểm chứng.
3. Giữ trạng thái nhả trong suốt chuyển động. Chỉ điều khiển cặp tường tương ứng khi điều kiện an toàn còn đúng; mất xác nhận thì dừng và giữ lối thoát.
4. Khi tường đến vị trí cuối, xác nhận chặn/giữ đã vào đúng chỗ rồi mới khôi phục trạng thái chơi.
5. Nếu có sự cố: dừng chuyển động, giữ các lối nhả, hướng người ra ngoài theo kế hoạch đã duyệt. Chỉ reset sau khi tìm và xử lý nguyên nhân; reset không được tự làm tường chạy lại. Nguyên tắc này phù hợp giải thích của Pilz về dừng khẩn: reset có chủ ý và không tự khởi động lại. [Pilz — emergency stop reset](https://www.pilz.com/en-IE/support/faq/standards/articles/180045).

Kiểm tra phần mềm đã xét trường hợp cả vị trí tường cũ và mới cùng bị chặn, rồi tìm đường về C02. Nó chưa mô phỏng đầy đủ cơ thể người, vùng quét liên tục, khói, tải đám đông, thời gian nhả hoặc tình huống linh kiện hỏng. C02 cũng chưa phải bằng chứng đã đi ra nơi an toàn bên ngoài; phải kiểm tra tiếp đường qua làng/C01 và lối thoát được duyệt.

## 10. Bảng vận hành S0–S3

| Pha | Điều kiện | L1 | L2 | X1, X2 | X3, X4 | C06 trong trò chơi |
|---|---|---|---|---|---|---|
| S0 | Vừa ra làng | Đóng | Đóng | Before | Before | Đóng |
| S1 | Xong Giam | Mở | Đóng | After | Before | Đóng |
| S2 | Xong Người canh | Mở | Mở | After | After | Đóng |
| S3 | Xong Tế | Mở | Mở | After | After | Mở |

Reset về S0 khi đã đưa hết người ra ngoài; áp dụng lại trình tự cách ly và nhả trước khi xoay ngược. Không reset giữa lượt chơi chỉ để đưa cửa về chỗ cũ.

## 11. Nghiệm thu, bảo trì và xử lý lỗi

In bảng này; ghi **Đạt / Không đạt / Người thử / Ngày**. Một mục không đạt thì không đưa cụm liên quan vào phục vụ. Lịch kiểm tra cơ khí và điện tuân theo nhà sản xuất và đánh giá sử dụng thực tế; số lần thử tùy ý không thay thế nghiệm thu.

| Việc thử | Điều kiện đạt |
|---|---|
| Kích thước và chiều cửa | Đúng bảng tọa độ; thông thủy thực tế và vùng quét được duyệt; không thêm cơ cấu hoặc lấn phòng |
| Khung, neo, trục | Đã kiểm tra theo thiết kế; không lỏng, võng, lệch hay cọ ở toàn hành trình |
| Từng OW01–OW22 | Đúng chiều khi chơi; tự đóng êm; nhả tại chỗ và nhả chung đều giải phóng được lối |
| X1–X4 tại hai vị trí | Đúng trục/đoạn; giữ ổn định; không cản lối dự kiến |
| X1–X4 giữa hành trình | Đã đo vùng quét thực; bảo vệ chống tiếp cận/kẹp và phản ứng dừng được kiểm chứng bằng dụng cụ thử phù hợp |
| L1/L2 | Đúng thứ tự; không trượt khỏi ray; chỗ đỗ không chiếm phòng/lối; mở khẩn được |
| E1 | Mở từ hai phía; giữ mở; không cần nhấc vật nặng, chìa hoặc tháo vít |
| Mất điện / mất tín hiệu / nút khẩn | Không phát sinh chuyển động; vẫn mở thoát được; reset không tự chạy lại |
| Đi toàn tuyến ở S0–S3 | Đúng trình tự, có đường về cổng; kiểm tra tiếp đến lối ra an toàn thật |
| Biển và dấu dẫn | Nhìn được, không nằm sau cánh/vách hoặc nhầm với dấu thoát nạn |
| Thử sau hoàn thiện | Sơn/nẹp/đạo cụ không làm tăng lực, gây kẹt, che thao tác hoặc cản cảm biến |

Trước mỗi ca: kiểm tra lối ra, E1, nhả một chiều, chốt giữ tường, vật lạ trên ray và liên lạc với người vận hành. Nếu phát hiện lỗi thì dừng sử dụng cụm lỗi, không buộc dây hoặc chêm tạm để tiếp tục chơi.

| Hiện tượng | Kiểm tra theo thứ tự |
|---|---|
| Cửa một chiều không tự đóng | Vật cản → lệch khung/trục → cọ sàn/nẹp → cài đặt tự đóng theo tài liệu |
| Cửa đóng quá mạnh | Dừng thử → kiểm tra bộ tự đóng/giảm chấn → chỉnh theo tài liệu → đo lại lực |
| Tường xoay nặng một đoạn | Dừng → kiểm tra đồng trục, nền, võng cánh và va chạm; không tăng công suất để ép qua |
| Cửa trượt bị nghiêng | Cách ly → kê/giữ cánh an toàn → kiểm tra ray, con trượt, chống nhấc và dẫn hướng |
| Nhả nhưng vẫn không qua được | Kiểm tra chặn cố định, tay bản lề, vị trí đỗ và cửa kế bên; sửa cơ khí rồi thử lại |
| Mất điện còn khóa người | Không vận hành; sửa phương án nhả độc lập trước khi thử lại |

Sau mọi thay đổi về vách, chiều cửa, vị trí trục, vùng đỗ hoặc bề rộng lối: cập nhật `src/layout.js`/nguồn sinh tương ứng, chạy lại pipeline kiểm tra rồi nghiệm thu thực tế phần bị ảnh hưởng. Thay phụ kiện cùng chức năng vẫn phải kiểm tra lại khe, lực, tải và nhả khẩn.

## 12. Bảng tọa độ lấy trực tiếp từ REV P

Các bảng dưới được sinh tự động từ layout đã kiểm tra. Giữ nguyên mã để trao đổi với thợ. Số làm tròn phục vụ đọc; dùng nguồn layout khi triển khai đo đạc. **Bảng tim vách không phải bảng cắt:** đầu nối, bề dày, trục, khung, khe và E1 phải được triển khai thành chi tiết trước khi đặt vật tư.

<!-- GENERATED_COORDINATES -->

SHA-256 layout: `4bfa818db193497c01c28394ab6103fea1207aca01d534ef65c586cb47f82a6b`.

### 12.1. Cửa ra/vào và cửa phòng (mét)

| Mã | Tâm x; z (m) | Trục đoạn cửa | Chức năng |
| --- | --- | --- | --- |
| C01 | (0.0000; 9.6250) | z | Vào làng |
| C02 | (4.1250; 8.2500) | x | Làng → mê cung |
| C03 | (10.0833; 0.4583) | z | Giam |
| C04 | (10.5417; 8.2500) | x | Người canh |
| C05 | (1.8333; 2.2917) | z | Tế |
| C06 | (11.0000; 0.4583) | z | Thoát trò chơi |

Trục x: đoạn cửa nằm ngang mặt bằng; trục z: đoạn cửa nằm dọc. Đây không phải ký hiệu tay bản lề.

### 12.2. Cửa một chiều

Đoạn đặt cửa là ranh giới chung của hai ô. Bảng ghi đoạn tim, chưa trừ khung/khe.

| Mã | Đi từ ô | Sang ô | Đoạn ranh giới (m) |
| --- | --- | --- | --- |
| OW01 | [2, 5] | [2, 4] | (1.8333; 4.5833) → (2.7500; 4.5833) |
| OW02 | [3, 5] | [3, 4] | (2.7500; 4.5833) → (3.6667; 4.5833) |
| OW03 | [8, 4] | [7, 4] | (7.3333; 3.6667) → (7.3333; 4.5833) |
| OW04 | [8, 5] | [8, 4] | (7.3333; 4.5833) → (8.2500; 4.5833) |
| OW05 | [2, 6] | [2, 5] | (1.8333; 5.5000) → (2.7500; 5.5000) |
| OW06 | [3, 6] | [3, 5] | (2.7500; 5.5000) → (3.6667; 5.5000) |
| OW07 | [4, 5] | [5, 5] | (4.5833; 4.5833) → (4.5833; 5.5000) |
| OW08 | [4, 6] | [4, 5] | (3.6667; 5.5000) → (4.5833; 5.5000) |
| OW09 | [5, 5] | [6, 5] | (5.5000; 4.5833) → (5.5000; 5.5000) |
| OW10 | [9, 6] | [9, 5] | (8.2500; 5.5000) → (9.1667; 5.5000) |
| OW11 | [1, 7] | [1, 6] | (0.9167; 6.4167) → (1.8333; 6.4167) |
| OW12 | [5, 6] | [6, 6] | (5.5000; 5.5000) → (5.5000; 6.4167) |
| OW13 | [5, 7] | [5, 6] | (4.5833; 6.4167) → (5.5000; 6.4167) |
| OW14 | [7, 7] | [7, 6] | (6.4167; 6.4167) → (7.3333; 6.4167) |
| OW15 | [9, 7] | [9, 6] | (8.2500; 6.4167) → (9.1667; 6.4167) |
| OW16 | [2, 7] | [1, 7] | (1.8333; 6.4167) → (1.8333; 7.3333) |
| OW17 | [2, 8] | [2, 7] | (1.8333; 7.3333) → (2.7500; 7.3333) |
| OW18 | [4, 7] | [5, 7] | (4.5833; 6.4167) → (4.5833; 7.3333) |
| OW19 | [5, 7] | [5, 8] | (4.5833; 7.3333) → (5.5000; 7.3333) |
| OW20 | [6, 7] | [7, 7] | (6.4167; 6.4167) → (6.4167; 7.3333) |
| OW21 | [6, 7] | [6, 8] | (5.5000; 7.3333) → (6.4167; 7.3333) |
| OW22 | [5, 8] | [4, 8] | (4.5833; 7.3333) → (4.5833; 8.2500) |

### 12.3. Tường xoay

| Mã | Khi mở | Trục x; z (m) | Before — đoạn tim (m) | After — đoạn tim (m) |
| --- | --- | --- | --- | --- |
| X1 | L1 | (10.0833; 6.4167) | (9.1667; 6.4167) → (10.0833; 6.4167) | (10.0833; 5.5000) → (10.0833; 6.4167) |
| X2 | L1 | (8.2500; 6.4167) | (8.2500; 6.4167) → (8.2500; 7.3333) | (7.3333; 6.4167) → (8.2500; 6.4167) |
| X3 | L2 | (0.9167; 2.7500) | (0.9167; 2.7500) → (1.8333; 2.7500) | (0.9167; 2.7500) → (0.9167; 3.6667) |
| X4 | L2 | (3.6667; 7.3333) | (3.6667; 6.4167) → (3.6667; 7.3333) | (2.7500; 7.3333) → (3.6667; 7.3333) |

X4 của REV P đặt trục tại (3,6667; 7,3333) m; không lấy hướng X4 từ REV O để lắp. Chọn cung quay 90° nối hai vị trí rồi kiểm tra vùng quét bằng cánh thật; không quay vòng dài 270°.

### 12.4. Khóa tuyến và panel E1

| Mã | Hai ô | Đoạn tim (m) | Mở khi |
| --- | --- | --- | --- |
| L1 | [10, 8] ↔ [11, 8] | (10.0833; 7.3333) → (10.0833; 8.2500) | Xong Giam |
| L2 | [1, 4] ↔ [1, 5] | (0.9167; 4.5833) → (1.8333; 4.5833) | Xong Người canh |
| E1 | [2, 7] ↔ [3, 7] | (2.7500; 6.4167) → (2.7500; 7.3333) | Nhả khẩn / trước mọi chuyển pha có xoay |

### 12.5. Tim các đoạn vách

Mã W dưới đây dùng để đánh dấu thi công theo thứ tự `WALLS`. Một đoạn dài có thể chia nhiều module theo thiết kế khung. **Đoạn W có E1 phải được thay bằng panel có thể mở, không xây kín.** Các trục xoay/cửa được liệt kê riêng, không cộng nhầm vào vách cố định.

| Mã | Tim đầu → cuối (m) | Chiều dài tim (m) | Ghi chú |
| --- | --- | --- | --- |
| W01 | (0.0000; 0.0000) → (11.0000; 0.0000) | 11.0000 | Triển khai đầu nối trước khi cắt |
| W02 | (0.9167; 0.9167) → (1.8333; 0.9167) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W03 | (0.9167; 1.8333) → (1.8333; 1.8333) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W04 | (6.4167; 1.8333) → (10.0833; 1.8333) | 3.6666 | Triển khai đầu nối trước khi cắt |
| W05 | (1.8333; 2.7500) → (6.4167; 2.7500) | 4.5834 | Triển khai đầu nối trước khi cắt |
| W06 | (9.1667; 2.7500) → (10.0833; 2.7500) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W07 | (3.6667; 3.6667) → (4.5833; 3.6667) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W08 | (6.4167; 3.6667) → (9.1667; 3.6667) | 2.7500 | Triển khai đầu nối trước khi cắt |
| W09 | (4.5833; 4.5833) → (6.4167; 4.5833) | 1.8334 | Triển khai đầu nối trước khi cắt |
| W10 | (9.1667; 4.5833) → (10.0833; 4.5833) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W11 | (0.0000; 5.5000) → (0.9167; 5.5000) | 0.9167 | Triển khai đầu nối trước khi cắt |
| W12 | (4.5833; 5.5000) → (5.5000; 5.5000) | 0.9167 | Triển khai đầu nối trước khi cắt |
| W13 | (6.4167; 5.5000) → (7.3333; 5.5000) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W14 | (9.1667; 5.5000) → (10.0833; 5.5000) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W15 | (2.7500; 6.4167) → (3.6667; 6.4167) | 0.9167 | Triển khai đầu nối trước khi cắt |
| W16 | (5.5000; 6.4167) → (6.4167; 6.4167) | 0.9167 | Triển khai đầu nối trước khi cắt |
| W17 | (10.0833; 6.4167) → (11.0000; 6.4167) | 0.9167 | Triển khai đầu nối trước khi cắt |
| W18 | (0.9167; 7.3333) → (1.8333; 7.3333) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W19 | (3.6667; 7.3333) → (4.5833; 7.3333) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W20 | (6.4167; 7.3333) → (7.3333; 7.3333) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W21 | (8.2500; 7.3333) → (10.0833; 7.3333) | 1.8333 | Triển khai đầu nối trước khi cắt |
| W22 | (0.0000; 8.2500) → (3.6667; 8.2500) | 3.6667 | Triển khai đầu nối trước khi cắt |
| W23 | (4.5833; 8.2500) → (10.0833; 8.2500) | 5.5000 | Triển khai đầu nối trước khi cắt |
| W24 | (0.0000; 11.0000) → (11.0000; 11.0000) | 11.0000 | Triển khai đầu nối trước khi cắt |
| W25 | (0.0000; 0.0000) → (0.0000; 9.1667) | 9.1667 | Triển khai đầu nối trước khi cắt |
| W26 | (0.0000; 10.0833) → (0.0000; 11.0000) | 0.9167 | Triển khai đầu nối trước khi cắt |
| W27 | (0.9167; 1.8333) → (0.9167; 2.7500) | 0.9167 | Triển khai đầu nối trước khi cắt |
| W28 | (0.9167; 3.6667) → (0.9167; 4.5833) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W29 | (0.9167; 6.4167) → (0.9167; 7.3333) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W30 | (1.8333; 0.0000) → (1.8333; 1.8333) | 1.8333 | Triển khai đầu nối trước khi cắt |
| W31 | (1.8333; 2.7500) → (1.8333; 3.6667) | 0.9167 | Triển khai đầu nối trước khi cắt |
| W32 | (1.8333; 4.5833) → (1.8333; 6.4167) | 1.8334 | Triển khai đầu nối trước khi cắt |
| W33 | (2.7500; 3.6667) → (2.7500; 5.5000) | 1.8333 | Triển khai đầu nối trước khi cắt |
| W34 | (2.7500; 6.4167) → (2.7500; 7.3333) | 0.9166 | E1 — panel nhả, bình thường đóng |
| W35 | (3.6667; 3.6667) → (3.6667; 5.5000) | 1.8333 | Triển khai đầu nối trước khi cắt |
| W36 | (4.5833; 3.6667) → (4.5833; 4.5833) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W37 | (4.5833; 5.5000) → (4.5833; 6.4167) | 0.9167 | Triển khai đầu nối trước khi cắt |
| W38 | (5.5000; 2.7500) → (5.5000; 3.6667) | 0.9167 | Triển khai đầu nối trước khi cắt |
| W39 | (5.5000; 7.3333) → (5.5000; 8.2500) | 0.9167 | Triển khai đầu nối trước khi cắt |
| W40 | (6.4167; 0.0000) → (6.4167; 2.7500) | 2.7500 | Triển khai đầu nối trước khi cắt |
| W41 | (7.3333; 1.8333) → (7.3333; 3.6667) | 1.8334 | Triển khai đầu nối trước khi cắt |
| W42 | (7.3333; 4.5833) → (7.3333; 7.3333) | 2.7500 | Triển khai đầu nối trước khi cắt |
| W43 | (8.2500; 2.7500) → (8.2500; 4.5833) | 1.8333 | Triển khai đầu nối trước khi cắt |
| W44 | (8.2500; 5.5000) → (8.2500; 6.4167) | 0.9167 | Triển khai đầu nối trước khi cắt |
| W45 | (8.2500; 8.2500) → (8.2500; 11.0000) | 2.7500 | Triển khai đầu nối trước khi cắt |
| W46 | (9.1667; 1.8333) → (9.1667; 2.7500) | 0.9167 | Triển khai đầu nối trước khi cắt |
| W47 | (9.1667; 6.4167) → (9.1667; 7.3333) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W48 | (10.0833; 0.9167) → (10.0833; 1.8333) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W49 | (10.0833; 2.7500) → (10.0833; 4.5833) | 1.8333 | Triển khai đầu nối trước khi cắt |
| W50 | (10.0833; 6.4167) → (10.0833; 7.3333) | 0.9166 | Triển khai đầu nối trước khi cắt |
| W51 | (11.0000; 0.9167) → (11.0000; 11.0000) | 10.0833 | Triển khai đầu nối trước khi cắt |

### 12.6. Phiếu bàn giao từng cụm

- Mã cụm: …; người lắp: …; ngày: …
- Bản vẽ chế tạo và tài liệu phụ kiện đính kèm: …
- Kích thước/khối lượng thực tế: …
- Chiều mở/vùng quét/vị trí đỗ đã đối chiếu: …
- Thử chế độ chơi: …; thử nhả khẩn/mất điện: …
- Lỗi còn lại và cách xử lý: …
- Người kiểm tra chấp nhận cho sử dụng: …

Giữ phiếu cạnh hồ sơ bảo trì. Nếu thay đổi phần cứng, cập nhật phiếu thay vì dựa vào ảnh chụp bản cũ.
