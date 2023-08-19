package week2.file.Controller;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import week2.file.Domain.PathRequest;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@RestController
public class FileController {

        @PostMapping("/readFile")
        public ResponseEntity<String> readFile(@RequestBody PathRequest pathRequest) {
            try {
                //도메인에 저장된 파일 경로 가져오기
                String filePath = pathRequest.getFilePath();

                // Resources 디렉터리 밑에 있는 파일들을 읽어오는 코드.
                //스프링 부트 내에서 제공되는 기능으로, 클래스패스 리소스로부터 파일 찾기
                Resource resource = new ClassPathResource(filePath);
                //해당 파일을 읽어오는 코드.
                InputStreamReader reader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8);
                String FileData = FileCopyUtils.copyToString(reader);

                // Json 데이터를 다시 postman으로 반환
                return ResponseEntity.ok(FileData);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to read file.");
            }
        }

    @PostMapping("/image/metadata")
    public ResponseEntity<Map<String, String>> getImageMetadata(@RequestBody PathRequest pathRequest) {
        try {
            // 도메인에 저장된 파일 경로 가져오기
            String filePath = pathRequest.getFilePath();

            // 이미지 파일 읽어오기
            ClassPathResource resource = new ClassPathResource(filePath);
            InputStream inputStream = resource.getInputStream();
            //읽은 파일의 내용을 바이트로 변환해줌
            byte[] imageBytes = IOUtils.toByteArray(inputStream);

            // 메타 데이터 파싱
            Metadata metadata = ImageMetadataReader.readMetadata(new File(resource.getURI()));

            String make = null;
            String latitude = null;
            String longitude = null;

            //make, latitude, longitude 정보 추출
            //metadata.getDirectories()를 통해 이미지 파일의 디렉토리 정보들을 가져옴.
            for (Directory directory : metadata.getDirectories()) {
                for (Tag tag : directory.getTags()) {
                    if (tag.getTagName().equals("Make")) {
                        make = tag.getDescription();
                    } else if (tag.getTagName().equals("GPS Latitude")) {
                        latitude = tag.getDescription();
                    } else if (tag.getTagName().equals("GPS Longitude")) {
                        longitude = tag.getDescription();
                    }
                }
            }

            // 추출된 정보를 JSON 형태로 만들어서 반환
            // => HashMap 객체를 생성하여 각 정보를 key-value 쌍으로 저장한다는 의미
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("make", make);
            responseMap.put("latitude", latitude);
            responseMap.put("longitude", longitude);
            return ResponseEntity.ok(responseMap);
        } catch (IOException e) { //파일을 읽는 도중 오류 발생시 처리 코드
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (ImageProcessingException e) { //이미지 처리 과정에서 오류 발생시 처리 코드
            throw new RuntimeException(e);
        }
    }
}

